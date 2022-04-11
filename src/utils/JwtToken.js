// const { getJWTtoken } = require('jsonwebtoken')
const User = require('../model/UserModel')

const tokenSender = async (user, statusCode, res) => {
    const token = await user.getJWTtoken();
    return res.status(statusCode).send({
        success: true,
        message: 'Login Successfull',
        token: token
    })
}

module.exports = { tokenSender };