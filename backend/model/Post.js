
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema;

const Post = PostSchema({

    imagename:{
        type:String,
        required: true,

    },

    pathFile: {
        type:String,
        required: true,
    },
    title: {
        type:String,
        required: true,

    }


   

},
    { timestamps: true }
);

module.exports = mongoose.model("Post", Post);