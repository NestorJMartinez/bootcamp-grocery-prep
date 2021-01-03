const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const Recipe = require("./models/recipe.js")

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://customer:remmy@gusteaus.sqzkt.mongodb.net/Food?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}).then(() => console.log("Connected to MongoDB"))

app.use("", express.static(path.join(__dirname, "..")))

app.use("/images", express.static(path.join(__dirname, "..", "..", "images")))

app.get("/", (req, res) => {
   res.status(200)
   res.sendFile(path.join(__dirname, "..", "index.html"))
})

app.get("/api/recipe", async (req, res) => {
   res.status(200)
   const list = await (Recipe.find({}))
   res.json(list)
})

app.get("/api/recipe/random", (req, res) => {
   res.status(200)
   res.send("random recipe request has been got")
   console.log("random recipe requested")
})

app.get("/api/recipe/:name", async (req, res) => {
   const name = req.params.name
   if (typeof name === undefined || name.length === 0) {
      res.status(400)
      res.send("error: where's the name bro?")
   }
   res.status(200)
   const rec = await Recipe.findOne({title: name})
   res.json(rec)
})

app.post("/api/rating", async (req, res) => {
  res.status(200)
  const ratings = (await Recipe.findOne({title: req.body.id})).ratings
  ratings.push(req.body.rating)
  await Recipe.updateOne({title: req.body.id}, {ratings: ratings})
  res.send(`rating of ${req.body.rating} for ${req.body.id} ` +
  `request has been posted`)
  console.log(`rating of ${req.body.rating} received for recipe `
  + `${req.body.id}`)
})

app.get("/api/cart", (req, res) => {
   res.status(200)
   res.send("items of your cart incoming")
   console.log("here are the items in your cart")
})

app.post("/api/cart", (req, res) => {
   res.status(200)
   res.send(`${req.body.quantity} of recipe ${req.body.id} added to da cart`)
   console.log(`${req.body.quantity} of recipe ${req.body.id} added to cart`)
})
app.listen(3001)
