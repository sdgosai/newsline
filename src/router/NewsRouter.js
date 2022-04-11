const express = require('express')
const router = require('express').Router()

// Controller require ...
const newsController = require('../controller/NewsController')

// API calls ...
router.get('/allNews', newsController.getAllNews)
router.post('/searchNews', newsController.searchNews)
router.get('/news/:category', newsController.categoryNews)

// Router export ...
module.exports = router