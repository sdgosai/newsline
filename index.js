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
const { UserAuthentication, RoleAuthenticaion } = require('./src/middleware/userAuth')
// Require routers ...
const userRouter = require('./src/router/UserRouter')
app.use('/api/private', userRouter)


const newsRouter = require('./src/router/NewsRouter')
app.all('/api/news/*', UserAuthentication)
app.use('/api/news', newsRouter)

// Port configure ...
const port = process.env.PORT
app.listen(port, () => {
    console.log(`node application live at ${port} ✅`)
})