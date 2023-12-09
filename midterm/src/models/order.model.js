import mysql from "mysql2";
import axios from "axios";
import NodeCache from "node-cache";

import { dbConfig } from "../config/db.config.js";

const myCache = new NodeCache();

const storeOuterTransaction = async (url) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    axios
      .get(url)
      .then(async (response) => {
        const insertPromises = [];
        for (let i = 0; i < response.data.length; i++) {
          const query = `INSERT INTO orders (total,list)` + `VALUES (?,?)`;
          const values = [
            response.data[i].total,
            JSON.stringify(response.data[i].list),
          ];
          const insertPromise = new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
              }

              resolve(result);
            });
          });
          insertPromises.push(insertPromise);
        }

        Promise.all(insertPromises)
          .then((results) => {
            console.log("All inserts completed", results);
            resolve(results);
          })
          .catch((error) => {
            console.error("An error occurred", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("An error occurred while fetching data", error);
        reject(error);
      });
  });
};

const storeProductOrderList = async () => {
  const data = await getTransactions();
  const connection = mysql.createConnection(dbConfig);

  const insertPromises = [];
  for (let i = 0; i < data.length; i++) {
    const query =
      `INSERT INTO product_order_list (product_id,price,color,size,qty) ` +
      `VALUES (?,?,?,?,?)`;

    data[i].list.forEach((item) => {
      let values = [
        item.id,
        item.price,
        JSON.stringify(item.color),
        JSON.stringify(item.size),
        item.qty,
      ];

      const insertPromise = new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        });
      });
      insertPromises.push(insertPromise);
    });
  }

  Promise.all(insertPromises)
    .then((results) => {
      console.log("All inserts completed", results);
      connection.end();
      resolve(results);
    })
    .catch((error) => {
      console.error("An error occurred", error);
      reject(error);
    });
};
const getTotalRevenue = async () => {
  if (myCache.has("totalRevenue")) {
    return myCache.get("totalRevenue");
  }

  const data = await getTransactions();
  let totalRevenue = 0;

  for (let i = 0; i < data.length; i++) {
    totalRevenue += parseInt(data[i].total);
  }
  myCache.set("totalRevenue", totalRevenue);

  return totalRevenue;
};

const getTransactions = async () => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    if (myCache.has("orders")) {
      resolve(myCache.get("orders"));
    }
    const query = `SELECT * FROM orders`;

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      connection.end();
      myCache.set("orders", result);
      resolve(result);
    });
  });
};

const getProductOrderList = async () => {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    if (myCache.has("product_order_list")) {
      resolve(myCache.get("product_order_list"));
    }
    const query = `SELECT * FROM product_order_list`;

    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      connection.end();
      myCache.set("product_order_list", result);
      resolve(result);
    });
  });
};

const aggregateSalesQuantitysByPrice = async () => {
  const data = await getProductOrderList();
  let priceQtyMap = new Map();

  for (let i = 0; i < data.length; i++) {
    let price = data[i].price;
    const qty = data[i].qty;
    price = price.toString().slice(0, -1);
    price = parseInt(price);
    price = price * 10;
    if (priceQtyMap.has(price)) {
      priceQtyMap.set(price, priceQtyMap.get(price) + qty);
    } else {
      priceQtyMap.set(price, qty);
    }
  }
  let result = Array.from(priceQtyMap).map(([key, value]) => ({
    x: key,
    y: value,
  }));
  return result;
};

const aggregateSalesQuantitysByColor = async () => {
  const data = await getProductOrderList();
  let colorQtyMap = new Map();

  for (let i = 0; i < data.length; i++) {
    const color = data[i].color.name;
    const val = [data[i].color.code, data[i].qty];
    if (colorQtyMap.has(color)) {
      colorQtyMap.set(color, [
        colorQtyMap.get(color)[0],
        colorQtyMap.get(color)[1] + val[1],
      ]);
    } else {
      colorQtyMap.set(color, val);
    }
  }
  let result = Array.from(colorQtyMap).map(([key, value]) => ({
    x: key,
    y: value,
  }));
  return result;
};

const getTop5QtyProducts = async () => {
  if (myCache.has("top5QtyProducts")) {
    return myCache.get("top5QtyProducts");
  }
  const query = `SELECT product_id, SUM(qty) AS qty FROM product_order_list GROUP BY product_id ORDER BY qty DESC LIMIT 5`;

  const connection = mysql.createConnection(dbConfig);
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      let promises = [];
      for (let i = 0; i < result.length; i++) {
        let promise = getSizeCountByProductId(result[i].product_id).then(
          (sizeCount) => {
            for (let j = 0; j < sizeCount.length; j++) {
              result[i][sizeCount[j].size] = sizeCount[j].qty;
            }
          }
        );
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        myCache.set("top5QtyProducts", result);
        connection.end();
        resolve(result);
      });
    });
  });
};

const getSizeCountByProductId = async (productId) => {
  const query = `SELECT size, SUM(qty) AS qty FROM product_order_list WHERE product_id = ? GROUP BY size`;

  const connection = mysql.createConnection(dbConfig);
  return new Promise((resolve, reject) => {
    connection.query(query, productId, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const orderModel = {
  storeOuterTransaction,
  getTransactions,
  storeProductOrderList,
  getTotalRevenue,
  getProductOrderList,
  aggregateSalesQuantitysByPrice,
  aggregateSalesQuantitysByColor,
  getTop5QtyProducts,
};

export default orderModel;
