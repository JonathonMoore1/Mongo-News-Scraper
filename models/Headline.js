// Import Mongoose
const mongoose = require("mongoose");

// Define Schema
const Schema = mongoose.Schema;

// Headline will be stored in `body`
const HeadlineSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    // required: true,
    // match: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  }
});

// Save the Headline model in variable `Headline`
const Headline = mongoose.model("Headline", HeadlineSchema);

// Export
module.exports = Headline;