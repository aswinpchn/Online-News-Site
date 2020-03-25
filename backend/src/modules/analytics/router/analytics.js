`use strict`

import express from 'express'
let router = express.Router()
import analyticsController from '../controller/analytics'

router.get('/liked/:editorId', analyticsController.mostLikedArticles)
router.get('/read/location/:editorId/:category', analyticsController.categoryReadByLocation)

module.exports = router
