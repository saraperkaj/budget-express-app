const { request } = require("express");
const express = require("express");
const transactionArray = require("../models/transactionPlacebo");
const transactions = express.Router();

//get the page route /transactions results in the array
transactions.get("/", (request, response) => {
  response.send(transactionArray);
});

//destructing index so necessary to put in
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
