const mongoose = require("mongoose");

const DemandSchema = mongoose.Schema;

const Demand =DemandSchema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

    
  },

  

},
  { timestamps: true }
);

module.exports = mongoose.model("Demand", Demand);