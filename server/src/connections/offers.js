const mongoose = require('mongoose')
const config = require('config')

const connection_offer = mongoose.createConnection(
    config.get('mongoUri'),
    // process.env.MONGO_URI,
    { dbName: "offers" }
)


module.exports = connection_offer