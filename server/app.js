// require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const path = require("path")
const routes = require('./src/routes')
const logger = require('./src/middleware/logger.middleware')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', logger, routes)

// console.log(process.env);
const PORT = config.get('port') ?? 8080
// const PORT = process.env.PORT ?? 8080

if (process.env.NODE_ENV === "development") {
    console.log("app.js development");
} else if (process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, "client")))

    const indexPath = path.join(__dirname, "client", "index.html")

    app.get("*", (req, res) => {
        res.sendFile(indexPath)
    })
}



async function start() {


    try {
        mongoose.set("strictQuery", "throw");



        // await mongoose.connect(process.env.MONGO_URI)
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green("MongoDb connected."));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on ${PORT}...`));
        })

    } catch (e) {
        console.log(chalk.red(e.message));
    }
}


start()

