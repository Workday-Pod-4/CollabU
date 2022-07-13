const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express();

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.get("/",(req, res, next) => {
    res.status(200).json({"ping": "pong"})
})
  

module.exports = app;