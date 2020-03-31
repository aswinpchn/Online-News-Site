`use strict`

import express from 'express'
let router = express.Router()
import articleController from '../controller/article'

router.post('/savearticle', articleController.saveArticle)
router.put('/modifyarticle', articleController.modifyArticle)
router.post('/:articleId', articleController.getArticle)
router.get('/headlines',articleController.getHeadlines)
router.get('/category/list',articleController.getAllCategories)

module.exports = router