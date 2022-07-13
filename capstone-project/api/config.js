require("dotenv").config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

module.exports = {
    PORT
}