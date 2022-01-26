const express = require("express");
const transArr = require("../models/transaction");
const transactions = express.Router();

const validateURL = (request, respond, next) => {
  if (
    request.body.url.substring(0, 7) === "http://" ||
    request.body.url.substring(0, 8) === "https://"
  ) {
    return next(), console.log(request.body.url);
  } else {
    respond
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

transactions.get("/", (request, respond) => {
  respond.status(200).json(transArr);
});

transactions.get("/:index", (request, respond) => {
  const { index } = request.params;
  if (transArr[index]) {
    respond.json(transArr[index]);
  } else {
    respond.redirect("/404");
  }
});

transactions.put("/:index", (request, respond) => {
  const { index } = request.params;
  transArr[index] = request.body;
  respond.status(200).json(transArr[index]);
});

transactions.post("/", validateURL, (request, respond) => {
  const updatedArray = transArr.push(request.body);
  respond.json(transArr[updatedArray - 1]);
});

transactions.delete("/:index", (request, respond) => {
  const { index } = request.params;
  const deletedTrans = transArr.splice(index, 1);
  respond.status(200).json(deletedTrans);
});

module.exports = transactions;
