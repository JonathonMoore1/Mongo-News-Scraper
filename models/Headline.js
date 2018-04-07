// Import Mongoose
const mongoose = require("mongoose");

// Define Schema
const Schema = mongoose.Schema;

// Headline will be stored in `body`
const HeadlineSchema = new Schema({
  title: {
    type: String,
   // required: true
  },
  summary: {
    type: String,
   // required: true
  },
  link: {
    type: String,
   // required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Save the Headline model in variable `Headline`
const Headline = mongoose.model("Headline", HeadlineSchema);

// Export
module.exports = Headline;