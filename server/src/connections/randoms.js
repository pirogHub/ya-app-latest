const mongoose = require('mongoose')
const config = require('config')

const connection_randoms = mongoose.createConnection(
    // config.get('mongoUri'),
    process.env.MONGO_URI,
    { dbName: "randoms" }
)


module.exports = connection_randoms