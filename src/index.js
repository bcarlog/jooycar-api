import express from "express"
import mongoose from "mongoose"
import routes from "./routes.js";

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27018/jooycar'

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const app = express()

app.use(express.json())

app.use(routes())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
