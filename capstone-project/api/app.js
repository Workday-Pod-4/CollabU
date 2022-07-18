const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const authRoutes = require("./routes/auth")

const security = require("./middleware/security")

const { NotFoundError } = require("./utils/errors")

const app = express();

// checks if a token exists for every request,
// attach decoded user to res.locals if exists
app.use(security.extractUserFromJwt)

// enable cross-origin resource sharing for all origins for all requests
app.use(cors())
// log requests info
app.use(morgan("tiny"))
// parse incoming requests with JSON payloads
app.use(express.json())

app.use("/auth", authRoutes)

app.get("/",(req, res, next) => {
    res.status(200).json({"ping": "pong"})
})

// Handle 404 errors
app.use((req, res, next) => {
    next(new NotFoundError())
})

// Generic error handler
app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})
  
module.exports = app;