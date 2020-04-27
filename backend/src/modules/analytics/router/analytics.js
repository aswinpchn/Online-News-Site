// SJSU CMPE 226 Fall 2019 TEAM1

`use strict`

import express from 'express'
let router = express.Router()
import analyticsController from '../controller/analytics'

router.get('/liked/:editorId', analyticsController.mostLikedArticles);
router.get('/read/location/:editorId/:category', analyticsController.categoryReadByLocation);
router.post('/read/time/', analyticsController.getArticleReadsByTimeOfTheDay);
router.post('/read/age/', analyticsController.getArticleReadsByAge);
router.get('/read/articles/:editorId', analyticsController.getMostFrequentlyReadArticles);
router.get('/read/category/:editorId', analyticsController.getMostFrequentlyReadCategories);

module.exports = router
