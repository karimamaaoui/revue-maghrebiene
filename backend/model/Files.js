const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema;
const ValidationSchema = mongoose.Schema;

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

var validation = new ValidationSchema({
    titleValidation:{
        type:Boolean,
        default:false
    },
    abstractValidation:{
        type:Boolean,
        default:false
    },
    keywordsValidation:{
        type:Boolean,
        default:false
    },
    abbreviationsValidation:{
        type:Boolean,
        default:false
    },
    filepasswordValidation:{
        type:Boolean,
        default:false
    },
    imageValidation:{
        type:Boolean,
        default:false
    },
    themeValidation:{
        type:Boolean,
        default:false
    },
    rulesValidation:{
        type:Boolean,
        default:false
    },
    typeValidation:{
        type:Boolean,
        default:false
    }
    },
    { timestamps: true }

);


const FilesSchema = mongoose.Schema;

const Files = FilesSchema({

    multiple_files: [],


    title: {
        type: String,
    },
    bio: {
        type: String,
    },
    abstract: {
        type: String,
    },

    keyWords: {
        type: [String],
        required: true
    },

    abbreviations: {
        type: String,
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

    editorValidation: [validation]
    


},
    { timestamps: true }
);

module.exports = mongoose.model("Files", Files);