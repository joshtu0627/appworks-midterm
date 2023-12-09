import express from "express";
import cors from "cors";

import orderController from "./controllers/order.controller.js";

const app = express();

app.use(cors());

app.get("/storeOuterTransaction", orderController.storeOuterTransaction);

app.get("/transactions", orderController.getTransactions);

app.get("/totalRevenue", orderController.getTotalRevenue);

app.get("/storeProductOrderList", orderController.storeProductOrderList);

app.get(
  "/aggregateSalesQuantitysByColor",
  orderController.aggregateSalesQuantitysByColor
);

app.get(
  "/aggregateSalesQuantitysByPrice",
  orderController.aggregateSalesQuantitysByPrice
);

app.get("/top5Products", orderController.getTop5QtyProducts);

app.get("/dashboard.html", (req, res) => {
  res.sendFile("dashboard.html", { root: "./" });
});

app.get("/measuretime.html", (req, res) => {
  res.sendFile("measuretime.html", { root: "./" });
});

app.listen(8000, () => {
  console.log(
    "Server running on port http://localhost:8000/admin/dashboard.html"
  );
});
