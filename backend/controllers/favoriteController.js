const Favorite = require('../model/Favorite');
const Article =require('../model/Files');
const User = require('../model/user');

const createFavorite = async (req, res) => {
    console.log('inside  create  Favorite');
   
    const userId = await User.findOne({_id:req.decoded.id});
  //  console.log('inside  create  Demand',userId);
    if (!userId) {
        res.status(404).json({ msg: 'User does not exist' });
    }
   
  
    const favorite = await new Favorite({
      user: userId.id,
      article:req.body.article
    });
    // Save attribute in the database
    favorite
      .save(favorite)
      .then(data => {
        res.send(data);
      })
      
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the favorite."
        });
      })
  
  };


  
//GET ALL

const getAllFavorite = ( async (req, res) => {
      console.log('inside get list of favorite');
      try {
          const favorite = await Favorite.find().populate('user',['_id','email','username']).sort({ _id: -1 }) ;
          return res.status(200).json(favorite);

      } catch (err) {
          return res.status(500).json({ msg: err });
      }
  });

  //delete Demand
const deleteFavorite = async (req, res) => {
  console.log('inside  delete  favorite');
  try {
    await Favorite.findByIdAndRemove(req.params.id);
    res.status(201).json('favorite has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};

    

  
module.exports = {
    createFavorite,
    getAllFavorite,
    deleteFavorite
}
  