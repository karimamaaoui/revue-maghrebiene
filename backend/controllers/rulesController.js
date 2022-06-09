const Rule =require('../model/Rule')

// create rules
const createRules = async (req, res) => {
    console.log('inside  create  rules');
    if (!req.body.label) {
      res.status(400).send({ message: "Label can not be empty!" });
      return;
    }
    console.log("rules", req.body)
  
    const rules = await new Rule({
      label: req.body.label,
    });
    // Save rules in the database
    rules
      .save(rules)
      .then(data => {
        console.log("data rules", data)
  
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the rules."
        });
      })
  
  };


  
//GET ALL

const retrieveAllRules = ( async (req, res) => {
  const query = req.query.new;
  console.log('inside get list of rules');
  try {
    const rules = await query ? await Rule.find().sort({ _id: -1 }).limit(10) : await Rule.find();
    return res.status(200).json(rules);

  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
  
module.exports = {
    createRules, 
    retrieveAllRules
  }