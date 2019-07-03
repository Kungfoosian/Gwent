"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cards = require("./cards");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/cards", (req, res) => {
  res.json(cards.getAll());
});

app.get("/cards/:id", (req, res) => {
  res.json(cards.getOne(req.params.id));
});

//Creating cards
app.post("/cards", (req, res) => {
  //let errors = preCheck(req.body);

  //Results
  res.json(cards.create(req.body));
});

//Update card
app.put("/cards/:id", (req, res) => {
  res.json(cards.updateCard(req.params.id, req.body));
});

//Delete card
app.delete("/cards/:id", (req, res) => {
  res.json(cards.deleteCard(req.params.id));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
