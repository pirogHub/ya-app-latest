const mongoose = require('mongoose')
const config = require('config')

const connection_user = mongoose.createConnection(
    config.get('mongoUri'),
    // process.env.MONGO_URI,
    { dbName: "usersData" }
)


module.exports = connection_user