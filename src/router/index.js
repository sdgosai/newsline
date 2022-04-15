const AuthRouter = require('./auth');
const publicRouter = require('./public');
const adminRouter = require('./admin');
module.exports = {
    publicRouter,
    AuthRouter,
    adminRouter
}