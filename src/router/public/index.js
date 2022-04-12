const router = require('express').Router();

const newsRouter = require('./NewsRouter');

router.use('/news', newsRouter);

module.exports = router