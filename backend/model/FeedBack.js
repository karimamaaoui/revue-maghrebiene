const mongoose= require("mongoose");

const FeedBackSchema =mongoose.Schema;

const FeedBack = FeedBackSchema({
    title: {
        type: String,
        required: true,
        max: 55,
        minlength:2 
    },

    message:{
        type:String,
        required: true,
        unique: true,
        minlength:2 

    },
    
},
    {timestamps: true}
);

module.exports = mongoose.model("FeedBack",FeedBack);