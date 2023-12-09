import orderModel from "../models/order.model.js";

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

const getTransactions = async (req, res) => {
  try {
    const response = await orderModel.getTransactions();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const response = await orderModel.getTotalRevenue();
    res.status(200).send({
      totalRevenue: response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const storeProductOrderList = async (req, res) => {
  try {
    const response = await orderModel.storeProductOrderList();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const aggregateSalesQuantitysByColor = async (req, res) => {
  try {
    const response = await orderModel.aggregateSalesQuantitysByColor();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const getTop5QtyProducts = async (req, res) => {
  try {
    const response = await orderModel.getTop5QtyProducts();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const aggregateSalesQuantitysByPrice = async (req, res) => {
  try {
    const response = await orderModel.aggregateSalesQuantitysByPrice();
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
