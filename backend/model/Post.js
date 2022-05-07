
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema;

const Post = PostSchema({

    titre: {
        type: String,
    },

    bio: {
        type: String,
    },
    fileArticle:[],


},
    { timestamps: true }
);

module.exports = mongoose.model("Post", Post);