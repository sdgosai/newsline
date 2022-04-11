const { verify } = require('jsonwebtoken');
const { User } = require('../model/UserModel')

exports.UserAuthentication = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(400).send({ success: false, message: 'Token required' });
        };
        let token = req.header('Authorization').replace('Bearer ', '')
        const decode = verify(token, process.env.JWTSECRET);
        const userdata = await User.findById({ _id: decode._id });
        if (!userdata) {
            return res.status(400).send({ success: false, message: "Please enter valid token" });
        }
        req.token = token;
        req.user = userdata;
        next()
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}

exports.RoleAuthenticaion = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(400).send({ success: false, message: 'Token required' });
        };
        let token = req.header('Authorization').replace('Bearer ', '')
        const decode = verify(token, process.env.JWTSECRET);
        const userdata = await User.findById({ _id: decode._id }).select('role');
        if (!userdata) {
            return res.status(400).send({ success: false, message: "Please enter valid token" });
        }
        if (userdata.role === 0) {
            req.token = token;
            req.user = userdata;
            next()
        }
        return res.status(400).send({ success: false, message: 'You dont have permission' })
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}