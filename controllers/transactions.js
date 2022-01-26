const express = require("express");
const transactionArray = require("../models/transaction");
const transactions = express.Router();

transactions.get("/", (_, response) => {
  response.send(transactionArray);
});

transactions.get("/:index", (request, response) => {
  const { index } = request.params;
  transactionArray[index]
    ? response.json(transactionArray[index])
    : response.status(404).json({ error: "Page not found" });
});

transactions.delete("/:index", (request, response) => {
  console.log(`Something was deleted`);
  const { index } = request.params;
  transactionArray.splice(index, 1);
  response.json(transactionArray);
});

transactions.post("/", (request, response) => {
  console.log(`You're posted, hun`);
  transactionArray.push(request.body);
  response.status(201).json(transactionArray);
});

transactions.put("/:index", (request, response) => {
  const { index } = request.params;
  transactionArray[index] = request.body;
  response.status(201).json(transactionArray);
});

module.exports = transactions;
