"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Middleware
app.use(bodyParser.json());

//Connect to MongoDB
const mongoURI = require("./config/keys").mongoURI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(`An error has occurred: ${err}`));

// Routes
const cardsAPI = require("./routes/api/cards");
app.use("/api/cards", cardsAPI);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
