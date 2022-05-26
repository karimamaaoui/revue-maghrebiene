const mongoose = require("mongoose");

const FeedBackSchema = mongoose.Schema;

const FeedBack = FeedBackSchema({
    
    star: {
        type: Number,
        required: true,
    },

    message: {
        type: String,
        required: true,
        minlength: 2

    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

},
    { timestamps: true }
);

module.exports = mongoose.model("FeedBack", FeedBack);