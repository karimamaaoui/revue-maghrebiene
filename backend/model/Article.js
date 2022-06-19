const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema;
const DecisionSchema = mongoose.Schema;

var reviews = new ReviewSchema({
    postedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }],
    text:String
    },
    { timestamps: true }

);

// var keyword = new KeywordSchema({
//         type: [String],
//         required: true
//     },
//     { timestamps: true }

// );


var decision = new DecisionSchema({
  
    articleDecision:{
        type:Boolean,
        default:false
    }
    },
    { timestamps: true }

);


const ArticleSchema = mongoose.Schema;

const Article = ArticleSchema({

    contenu: [],


    title: {
        type: String,
    },
    abstract: {
        type: String,
    },

    keyWords: {
        type: [String],
        required: true
    },

   
    filepassword: {
        type: String,
        default: ''
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }],

    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],


    view: [{
        viewBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        name: String,
        count: Number,


    }],

    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

    }],



    status: {
        type: String,
        enum: ['rejected', 'accepted', 'loading'],
        default: 'loading'
    },

    published: {
        type: Boolean,
        default: false
    },

    typeArticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,

    }],


    attributesAticle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attributes',
        required: true,

    }],
    read: {
        type: Boolean,
        default: false,
    },

    rulesChecked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rule',
        }],

    imagename: {
        type: String,
        required: true,

    },

    pathFile: {
        type: String,
        required: true,
    },
    
    editorReview: [reviews],

    editorValidation: [decision]
    


},
    { timestamps: true }
);

module.exports = mongoose.model("Article", Article);