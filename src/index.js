import express from "express"
import mongoose from "mongoose"
import routes from "./routes.js";

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27018/jooycar'

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Could not connect to MongoDB: ${mongoUrl}`, err));

const app = express()

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET")
  next();
});

app.use(express.json())

app.use(routes())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
