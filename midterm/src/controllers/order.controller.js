import orderModel from "../models/order.model.js";

// this function is used to store the data from the url
const storeOuterTransaction = async (req, res) => {
  try {
    const response = await orderModel.storeOuterTransaction(
      "http://35.75.145.100:1234/api/1.0/order/data"
    );
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// this function is used to get the data from the database
const getTransactions = async (req, res) => {
  try {
    const response = await orderModel.getTransactions();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// this function is used to store another table to optimize the query
const storeProductOrderList = async (req, res) => {
  try {
    const response = await orderModel.storeProductOrderList();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    console.log("getTotalRevenue");

    const startMemory = process.memoryUsage().heapUsed;
    const start = new Date();
    const response = await orderModel.getTotalRevenue();
    const end = new Date();
    const endMemory = process.memoryUsage().heapUsed;
    console.log("Total time: ", end - start);
    console.log("memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");

    res.status(200).send({
      totalRevenue: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const aggregateSalesQuantitysByPrice = async (req, res) => {
  try {
    console.log("aggregateSalesQuantitysByPrice");
    const startMemory = process.memoryUsage().heapUsed;
    const start = new Date();
    const response = await orderModel.aggregateSalesQuantitysByPrice();
    const end = new Date();
    const endMemory = process.memoryUsage().heapUsed;
    console.log("Total time: ", end - start);
    console.log("memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const aggregateSalesQuantitysByColor = async (req, res) => {
  try {
    console.log("aggregateSalesQuantitysByColor");
    const startMemory = process.memoryUsage().heapUsed;
    const start = new Date();
    const response = await orderModel.aggregateSalesQuantitysByColor();
    const end = new Date();
    const endMemory = process.memoryUsage().heapUsed;
    console.log("Total time: ", end - start);
    console.log("memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getTop5QtyProducts = async (req, res) => {
  try {
    console.log("getTop5QtyProducts");
    const startMemory = process.memoryUsage().heapUsed;
    const start = new Date();
    const response = await orderModel.getTop5QtyProducts();
    const end = new Date();
    const endMemory = process.memoryUsage().heapUsed;
    console.log("Total time: ", end - start);
    console.log("memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const orderController = {
  storeOuterTransaction,
  getTransactions,
  getTotalRevenue,
  storeProductOrderList,
  getTop5QtyProducts,
  aggregateSalesQuantitysByColor,
  aggregateSalesQuantitysByPrice,
};

export default orderController;
