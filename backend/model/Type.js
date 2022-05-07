const mongoose= require("mongoose");

const TypeSchema =mongoose.Schema;

const Type = TypeSchema({
    label:{
        type:String,
        required: true,
        unique: true,
        minlength:2 
    },
    
},
    {timestamps: true}
);

module.exports = mongoose.model("Type",Type);