const Attribute = require('../model/Attributes');

// create Attribute
const createAttribute = async (req, res) => {
  console.log('inside  create  attribute');
  if (!req.body.label) {
    res.status(400).send({ message: "Label can not be empty!" });
    return;
  }
  console.log("attributes", req.body)

  const attribute = await new Attribute({
    label: req.body.label,
  });
  // Save attribute in the database
  attribute
    .save(attribute)
    .then(data => {
      console.log("data attribute", data)

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Attribute."
      });
    })

};

// update Attribute
const updateAttribute = async (req, res) => {
  console.log('inside find update Attribute');
  try {
    const updateAttribute = await Attribute.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
        updatedAt: Date.now()
      },
      {
        new: true
      }

    );

    res.status(200).json(updateAttribute);
  } catch (err) {
    res.status(404).json("Attribute not found");
  }

}

//delete Attribute
const deleteAttribute = async (req, res) => {
  console.log('inside  delete  Attribute');
  try {
    await Attribute.findByIdAndRemove(req.params.id);
    res.status(201).json('Attribute has been deleted...');

  } catch (err) {
    res.status(500).json(err);
  }

};

//GET 
const getOneAttribute= (async (req, res) => {
  console.log('inside find article by id');

  try {
    /*   const user= await User.findById({user:req.decoded.id } );
       console.log("inside get user",user)
       console.log("inside get user id ",req.decoded.id)
       */
    const article = await Attribute.findById(req.params.id);
    console.log("inside get user", article)

    res.status(200).json(article);


  } catch (err) {
    res.status(500).json({ msg: "Unauthorized" });
  }


});

//GET ALL

const retrieveAllAttributes = (async (req, res) => {
  const query = req.query.new;
  console.log('inside get list of attributes');
  try {
    const attributes = await query ? await Attribute.find().sort({ _id: -1 }).limit(10) : await Attribute.find();
    return res.status(200).json(attributes);

  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = {
  createAttribute,
  updateAttribute,
  deleteAttribute,
  retrieveAllAttributes,
  getOneAttribute
  ,
}