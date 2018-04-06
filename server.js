// Dependencies
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const logger = require("morgan");

// Initialize Express
const app = express();

// Use Morgan and Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Using "public" directory
const path = require("path");
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const routes = require("./routes/index.js");
app.use(routes.view);
app.use(routes.api);


// Mongoose configuration

// Promises
mongoose.Promise = Promise;

// Connection
mongoose.connect("mongodb://localhost/mongo-news-scraper");

const db = mongoose.connection;

db.on("error", error => {
  if (error) {
    console.log("Database Error: ", error);
  }
});

db.once("open", () => console.log("MongoDB connection successful"));

// Listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, err => console.log("App listening on port " + PORT))