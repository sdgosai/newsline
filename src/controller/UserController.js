const { User } = require('../model/UserModel')
const { compare } = require('bcryptjs')
const { tokenSender } = require('../utils/JwtToken')

// Registration Controller ...
exports.registerController = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        let profile;
        if (req.file && req.file !== undefined) {
            profile = req.file.originalname
        }
        if (!fullName) {
            return res.status(400).send({
                success: false,
                message: 'Please enter name!'
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Please enter email!'
            })
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: 'Please enter password!'
            })
        }
        User.findOne({ email }).then(user => {
            if (user) {
                return res.status(400).send({
                    success: false,
                    message: 'User already exists'
                })
            } else {
                const user = new User({
                    image: profile, fullName: fullName, email: email, password: password
                })
                user.save().then(save => {
                    if (save) {
                        return res.status(200).send({
                            success: true,
                            data: user
                        })
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: 'occurd error'
                        })
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}

// login Controller ...
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide valid details!'
            })
        }
        User.findOne({ email }).select('+password +role -createAt -updateAt +is_Deleted')
            .then(user => {
                if (user) {
                    compare(password, user.password).then(match => {
                        if (match) {
                            return tokenSender(user, 200, res)
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: 'Invalid login details!'
                            })
                        }
                    }).catch(err => {
                        return res.status(400).send({
                            success: false,
                            message: 'Invalid Login details',
                            error: err
                        })
                    })
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "User can't register"
                    })
                }
            }).catch(err => {
                return res.status(400).send({
                    success: false,
                    message: 'Failed',
                    error: err
                })
            })
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}