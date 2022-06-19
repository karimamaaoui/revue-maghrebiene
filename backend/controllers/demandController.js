const Demand =require('../model/Demand');
const User = require('../model/user');

//create demand
const createDemand = async (req, res) => {
    console.log('inside  create  Demand');
   
    const userId = await User.findOne({_id:req.decoded.id});
    if (!userId) {
        res.status(404).json({ msg: 'User does not exist' });
    }
   
  
    const demand = await new Demand({
      user: userId.id,
      coverletter:req.body.coverletter
    });
    
    

    // Save attribute in the database
    demand
      .save(demand)
      .then(data => {

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

  //delete Demand
const deleteDemand = async (req, res) => {
  console.log('inside  delete  demand');
  try {
    await Demand.findByIdAndRemove(req.params.id);
    res.status(201).json('demand has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};

    

  
module.exports = {
    createDemand,
    getAllDemands,
    deleteDemand
  }
  