`use strict`

import express from 'express'
let router = express.Router()
import articleController from '../controller/article'
import validator from '../validator'
import validation from 'express-validation'

router.post('/savearticle', articleController.saveArticle)
router.put('/modifyarticle', articleController.modifyArticle)
router.post('/:articleId', articleController.getArticle)
router.get('/headlines',articleController.getHeadlines)

module.exports = router