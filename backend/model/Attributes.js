const mongoose= require("mongoose");

const AttributesSchema =mongoose.Schema;

const Attributes = AttributesSchema({
    label:{
        type:String,
        required: true,
        unique: true,
        minlength:2 

    },
    
},
    {timestamps: true}
);

module.exports = mongoose.model("Attributes",Attributes);