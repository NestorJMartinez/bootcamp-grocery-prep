const mongoose = require("mongoose")

const schema = new mongoose.Schema({
   title: String,
   desc: String,
   picture: String,
   ratings: [Number],
   servings: Number,
   ingredients: [{ingedient: String, count: Number}],
   instructions: [String]
}, {collection: "Recipes"})

const Recipe = mongoose.model("Recipes", schema)
module.exports = Recipe

