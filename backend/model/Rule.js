const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ruleSchema = new Schema({
    label: {
        type: String,
        required:true,
    },

    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      }],
      checked: {
        type:Boolean,
        default:false
    },

   
});

const Rule = mongoose.model('Rule', ruleSchema);

module.exports = Rule;