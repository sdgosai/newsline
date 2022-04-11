const router = require('express').Router()
const multer = require('multer');

// Controller require ...
const userController = require('../controller/UserController')

// Multer file upload ...
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/')
    },
    filename: function (req, file, cb) {
        const name = file.originalname;
        // console.log(file);
        cb(null, name)
    }
})
var upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }

        cb(null, true)
    }
}).single('profile')

// API calls ...
router.post('/userRegister', upload, userController.registerController)
router.post('/userLogin', userController.loginController)

// Router export ...
module.exports = router;