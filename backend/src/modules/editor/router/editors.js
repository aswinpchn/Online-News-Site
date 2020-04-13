`use strict`

import express from 'express'
let router = express.Router()
import editorController from '../controller/editors'

router.post('/signup', editorController.createEditor)
router.get('/profile/:editorId', editorController.getEditorProfile);
router.put('/update', editorController.updateEditorProfile);

module.exports = router
