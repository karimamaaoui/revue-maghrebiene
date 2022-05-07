const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    label: {
        type: String,
        required:true,
    },
   
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;