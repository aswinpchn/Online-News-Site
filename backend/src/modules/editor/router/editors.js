`use strict`

import express from 'express'
let router = express.Router()
import editorController from '../controller/editors'
import validator from '../validator'
import validation from 'express-validation'

router.post('/signup', editorController.createEditor)
router.get('/profile/:editorId', editorController.getEditorProfile)

module.exports = router
