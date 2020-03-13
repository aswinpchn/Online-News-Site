`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'

router.post('/signup', validation(validator['signup']), userController.createUser)
router.post('/login', validation(validator['login']), userController.loginUser)
router.put('/logout',  validation(validator['logout']), userController.logout)

module.exports = router
