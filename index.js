// Require Package ...
const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))

// Require Database ...
require('./src/db_config/Config')

// Require routers ...
const userRouter = require('./src/router/UserRouter')
app.use('/api', userRouter)
const newsRouter = require('./src/router/NewsRouter')
app.use('/api', newsRouter)

// Port configure ...
const port = process.env.PORT
app.listen(port, () => {
    console.log(`node application live at ${port} ✅`)
})