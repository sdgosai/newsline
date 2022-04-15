const express = require('express')
const router = require('express').Router()

// Controller require ...
const newsController = require('../../controller/NewsController')

// API calls ...
router.get('/all', newsController.getAllNews)
router.post('/search', newsController.searchNews)
router.get('/:category', newsController.categoryNews)

// Router export ...
module.exports = router