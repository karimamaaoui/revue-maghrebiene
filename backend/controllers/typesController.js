const Type = require('../model/Type');

// create type
const createType = async (req, res) => {
  console.log('inside  create  type');
  if (!req.body.label) {
    res.status(400).send({ message: "Label can not be empty!" });
    return;
  }
  console.log("types", req.body)

  const type = await new Type({
    label: req.body.label,
  });
  // Save type in the database
  type
    .save(type)
    .then(data => {
      console.log("data type", data)

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Type."
      });
    })

};

// update type
const updateType = async (req, res) => {
  console.log('inside find update Type');
  try {
    const updateType = await Type.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        updatedAt: Date.now()
      },
      {
        new: true
      }

    );

    res.status(200).json(updateType);
  } catch (err) {
    res.status(404).json("Type not found");
  }

}

//delete type
const deleteType = async (req, res) => {
  console.log('inside  delete  Type');
  try {
    await Type.findByIdAndRemove(req.params.id);
    res.status(201).json('Type has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};


//GET ALL

const retrieveAllTypes = ( async (req, res) => {
    const query = req.query.new;
    console.log('inside get list of types');
    try {
      const types = await query ? await Type.find().sort({ _id: -1 }).limit(10) : await Type.find();
      return res.status(200).json(types);

    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  });


  //GET 
const getOneType= (async (req, res) => {
  console.log('inside find article by id');

  try {
    /*   const user= await User.findById({user:req.decoded.id } );
       console.log("inside get user",user)
       console.log("inside get user id ",req.decoded.id)
       */
    const type = await Type.findById(req.params.id);
    console.log("inside get user", type)

    res.status(200).json(type);


  } catch (err) {
    res.status(500).json({ msg: "Unauthorized" });
  }


});


const getTypeSearch = (async (req, res) => {
  console.log("key", req.params.key)

  try {
   
    const type = await Type.find(
      {
        "$or": [
          { "label": { $regex: req.params.key } },
        
        ]
      }
    );
    res.send(type)


  } catch (err) {
    return res.status(500).json({ msg: err });
  }

})

module.exports = {
  createType,getOneType,
  deleteType,
  updateType,
  retrieveAllTypes,
  getTypeSearch
}