`use strict`

import express from 'express'
let router = express.Router()
import articleController from '../controller/article'

router.post('/savearticle', articleController.saveArticle)
router.put('/modifyarticle', articleController.modifyArticle)
router.get('/:editorId/:articleId', articleController.getArticle)
router.get('/headlines',articleController.getHeadlines)
router.get('/category/list',articleController.getAllCategories)
router.get('/:editorId/:articleId/:userId', articleController.getLikeStatus);
module.exports = router