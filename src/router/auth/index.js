const router = require('express').Router();

const userRouter = require('./UserRouter');

router.use('/user', userRouter);

module.exports = router;