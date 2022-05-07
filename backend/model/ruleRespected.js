const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ruleRespectedSchema = new Schema({
    checked: {
        type:Boolean,
        default:false
    },

    rule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rule',
      }],
    
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      }],
    
});

const RuleRespected = mongoose.model('RuleRespected', ruleRespectedSchema);

module.exports = RuleRespected;