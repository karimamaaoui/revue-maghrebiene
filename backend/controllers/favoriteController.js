const Favorite = require('../model/Favorite');
const User = require('../model/user');

const createFavorite = async (req, res) => {
    console.log('inside  create  Favorite');
   
    const userId = await User.findOne({_id:req.decoded.id});
    if (!userId) {
        res.status(404).json({ msg: 'User does not exist' });
    }
    console.log('req.params.article',req.params.id)
  
    const favorite = await new Favorite({
      user: userId.id,
      article:req.params.id
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
          const favorite = await Favorite.find().populate('user',['email','username'])
          .populate('article')
          .sort({ _id: -1 }) ;
          console.log('favorite',favorite)
          const _idUser=favorite.map((fav)=>{return (fav.user._id)});
          
          console.log('iduser',_idUser)
         
          if(req.decoded.id.includes(_idUser))
          {
          return res.status(200).json(favorite);
        }else {
          return res.status(400).json('no');

        }

      } catch (err) {
          return res.status(500).json({ msg: err });
      }
  });

  //delete Favorite
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
  