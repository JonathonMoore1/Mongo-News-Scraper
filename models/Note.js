// Import Mongoose
const mongoose = require("mongoose");

// Define Schema
const Schema = mongoose.Schema;

// Note content will be stored in `body`
const NoteSchema = new Schema({
  body: {
    type: String,
    validate: ((input) => input.length <= 255)
  }
});

// Save the Note model in variable `Note`
const Note = mongoose.model("Note", NoteSchema);

// Export
module.exports = Note;