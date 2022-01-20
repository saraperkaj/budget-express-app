const express = require("express");
const transArr = require("../models/transaction");
const transactions = express.Router();

const validateURL = (request, respond, next) => {
  if (
    request.body.url.substring(0, 7) === "http://" ||
    request.body.url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    respond
      .status(400)
      .send(`Oops, you forgot to start your url with http:// or https://`);
  }
};

transactions.get("/", (request, respond) => {
  respond.status(200).json(transArr);
});

transactions.get("/:id", (request, respond) => {
  const { id } = request.params;
  if (transArr[id]) {
    respond.json(transArr[id]);
  } else {
    respond.redirect("/404");
  }
});

transactions.put("/:id", async (request, respond) => {
  const { id } = request.params;
  transArr[id] = request.body;
  respond.status(200).json(transArr[id]);
});

transactions.post("/", validateURL, (request, respond) => {
  const updatedArray = transArr.push(request.body);
  respond.json(transArr[updatedArray - 1]);
});

transactions.delete("/:id", (request, respond) => {
  const { id } = request.params;
  const deletedTrans = transArr.splice(id, 1);
  res.status(200).json(deletedTrans);
});

module.exports = transactions;
