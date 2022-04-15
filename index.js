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

// Require Middleware
const { UserAuthentication, RoleAuthenticaion } = require('./src/middleware/userAuth')

// Require routers ...
const { adminRouter, AuthRouter, publicRouter } = require('./src/router/index')
app.use('/v1/auth', AuthRouter)
app.all('/v1/public/*', UserAuthentication)
app.use('/v1/public', publicRouter)
app.all('/v2/*', RoleAuthenticaion);
app.use('/v2', adminRouter)

// Port configure ...
const port = process.env.PORT
app.listen(port, () => {
    console.log(`node application live at ${port} ✅`)
})