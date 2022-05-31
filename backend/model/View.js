
const mongoose = require("mongoose");

const ViewSchema = mongoose.Schema;

const View = ViewSchema({
    
    viewBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files'
    }],

    name: String,
    count: Number

   

},
    { timestamps: true }
);

module.exports = mongoose.model("View", View);