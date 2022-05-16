const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema;

const Author = AuthorSchema({
  
  author: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  university: {
    type: String,
    default: "",
    max: 100

  },

  placeofpractice: {
    type: String,
    default: "",
    max: 100
  },


},
  { timestamps: true }
);

module.exports = mongoose.model("Author", Author);