const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients:{
      type:[],
      required:true
    },
    recipes:{
        type:String,
        required:true
    },
    publish:{
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Recipes  = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;