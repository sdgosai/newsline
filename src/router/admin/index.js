const router = require('express').Router()
const multer = require('multer');

// Controller require ...
const userController = require('../../controller/UserController')

router.get('/userlist', userController.userList)

// Router export ...
module.exports = router;