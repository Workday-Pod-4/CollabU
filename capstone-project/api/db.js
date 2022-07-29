const { Client } = require('pg')
const { getDatabaseURL } = require('./config')
require('colors')

const db = new Client({ connectionString: getDatabaseURL() })

db.connect((err) => {
    if (err) {
        console.error("Connection Error ".red, err.stack)
    } else {
        console.log("Successfully Connected to Database!".blue)
    }
})

module.exports = db