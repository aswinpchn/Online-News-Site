`use strict`

import express from 'express'
let router = express.Router()
import editorController from '../controller/editors'
import validator from '../validator'
import validation from 'express-validation'

router.post('/signup', editorController.createEditor)
router.get('/profile/:editorId', editorController.getEditorProfile)
router.post('/read/time/', editorController.getArticleReadsByTimeOfTheDay);
router.post('/read/age/', editorController.getArticleReadsByAge);
router.get('/read/articles/:editorId', editorController.getMostFrequentlyReadArticles);
router.get('/read/category/:editorId', editorController.getMostFrequentlyReadCategories);

module.exports = router
