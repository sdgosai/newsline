const { Schema, model, Mongoose } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const userSchema = new Schema({
    image: {
        type: String,
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        default: 1,
    },
    is_Deleted: {
        type: Boolean,
        default: false,
        select: false
    },
    is_LoggedOut: {
        type: Boolean,
        default: false,
        select: false
    },
}, { timestamps: true })

// Password hashing ...
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await hash(this.password, 10);
})
userSchema.methods.getJWTtoken = async function () {
    let payload = {
        _id: this._id
    }
    return await sign(payload, process.env.JWTSECRET, {
        expiresIn: '1d'
    })
}
// Compare Password ..
userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password)
}

// Model export ...
const User = model('user', userSchema);
module.exports = { User }