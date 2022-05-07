const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema;

const Author = AuthorSchema({
  author: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  

},
  { timestamps: true }
);

module.exports = mongoose.model("Author", Author);