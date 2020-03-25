`use strict`

import express from 'express'
let router = express.Router()
import analyticsController from '../controller/analytics'

router.get('/liked/:editorId', analyticsController.mostLikedArticles)

module.exports = router
