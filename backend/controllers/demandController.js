const Demand =require('../model/Demand');
const User = require('../model/user');

const createDemand = async (req, res) => {
    console.log('inside  create  Demand');
   
    const userId = await User.findOne({_id:req.decoded.id});
    console.log('inside  create  Demand',userId);
    if (!userId) {
        res.status(404).json({ msg: 'User does not exist' });
    }
   
  
    const demand = await new Demand({
      user: userId.id,
    });
    // Save attribute in the database
    demand
      .save(demand)
      .then(data => {
        console.log("data demand", data)
        res.send(data);
      })
      
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Attribute."
        });
      })
  
  };


  
//GET ALL

const getAllDemands = ( async (req, res) => {
      console.log('inside get list of demands');
      try {
          const demand = await Demand.find().populate('user',['_id','email','username']).sort({ _id: -1 }) ;
          return res.status(200).json(demand);

      } catch (err) {
          return res.status(500).json({ msg: err });
      }
  });
    

  
module.exports = {
    createDemand,
    getAllDemands,

  }
  