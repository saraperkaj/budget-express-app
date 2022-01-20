const express = require("express");
const app = express();
const cors = require("cors");

const transactions = require("./controllers/transactions");
app.use("/transactions", transactions);
app.use(express.json());
app.use(cors());

app.get("/", (request, respond) => {
  respond.status(200).send("Welcome to the Budgeting App");
});

app.get("*", (request, respond) => {
  respond.status(404).json({ Error: "Page not found!" });
});

module.exports = app;
