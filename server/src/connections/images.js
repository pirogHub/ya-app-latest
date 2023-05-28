const mongoose = require('mongoose')
const config = require('config')

const connection_image = mongoose.createConnection(
    // config.get('mongoUri'),
    process.env.MONGO_URI,
    { dbName: "images" }
)


module.exports = connection_image