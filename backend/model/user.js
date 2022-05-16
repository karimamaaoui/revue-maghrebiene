const mongoose= require("mongoose");

const UserSchema =mongoose.Schema;

const User = UserSchema({
    username:{
        type:String,
        required: true,
        unique: true,
        minlength: 3,
        max: 55,
    },
    firstname:{
        type:String,
        default:"",
        max:55


    },
    lastname:{
        type:String,
        default:"",
        max:55


    },
   
    password:{
        type:String,
        required: true,
        minlength: 4,
        max:55
    },
    email:{
        type:String,
        required: true,
        unique: true,

    },
   
    profilePic:{
        type:String,
        default:""
    },
    
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
      isVerified: { type: Boolean, default: false },

      resetToken:{
          type:String,
          default:""
      },
      
      isApproved: { 
        type: Boolean,
        default: false
       },

},
    {timestamps: true}
);

module.exports = mongoose.model("User",User);