const mongoose = require("mongoose");

const RoleSchema =mongoose.Schema;

const Role = RoleSchema({
  name:{
      type:String,
      required: true,
  },}
 );

module.exports = mongoose.model("Role",Role);