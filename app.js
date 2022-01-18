const express = require("express");
const app = express();
const transactions = require("./controllers/transactions");
const cors = require("cors");
const transaction = require("./models/transaction");

app.use("/transactions", transactions);
app.use(express.json());
app.use(cors());

app.get("/", (request, respond) => {
  respond.send("Welcome to the Budgeting App");
});

app.get("*", (request, respond) => {
  respond.status(404).json({ Error: "Page not found!" });
});

module.exports = app;
