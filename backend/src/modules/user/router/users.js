`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'

router.get('/dummy', userController.dummy)
router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/profile/:userId', userController.getUserProfile)
router.post('/update', userController.updateUserProfile)
router.post('/notifications/:userId', userController.updateUserProfile)

module.exports = router
