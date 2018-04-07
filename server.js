const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const request = require("request");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();


// Set Handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongo-news-scraper");

mongoose.connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connection.once("open", () => console.log("MongoDB connection successful"));

// Using "public" directory
const path = require("path");
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
const routes = require("./routes");
app.use(routes.view);
app.use(routes.api);


//const dbRouter = require("./controllers/headline");
app.get("/scrape", (req, res) => {
  request("https://www.nytimes.com/", (err, response, html) => {
    const $ = cheerio.load(response);
    
    $("h2 .story").each((i, el) => {
      let result = {};
      result.title = $(this).children("a").text();
      result.summary = $(this).children("p").text();
      result.link = $(this).children("a").attr("href");

      
      // 
      db.Headline.create(result)
        .then((dbArticle) => console.log(dbArticle))
        .catch((err) => res.json(err));
    });
    console.log(html);
    res.send("Scrape complete!");
  });
});

// Listener
app.listen(PORT, err => console.log("App listening on port " + PORT))