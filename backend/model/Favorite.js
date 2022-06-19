const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema;

const Favorite =FavoriteSchema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },

  article: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Files',
  }],

},
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", Favorite);