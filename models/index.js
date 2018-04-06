// Store imported models and export

// module.exports = {
//   Note: require("./Note"),
//   Article: require("./Article")
// }

// Import Mongoose
const mongoose = require("mongoose");

// Define Schema
const Schema = mongoose.Schema;

// Article will be stored in `body`
const ArticleSchema = new Schema({
  body: String
});

// Save the Article model in variable `Article`
const Article = mongoose.model("Article", ArticleSchema);

// Export
module.exports = Article;