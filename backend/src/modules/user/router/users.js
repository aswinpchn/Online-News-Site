// SJSU CMPE 226 Fall 2019 TEAM1

`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'

router.get('/dummy', userController.dummy)
router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/profile/:userId', userController.getUserProfile)
router.put('/update', userController.updateUserProfile)
router.get('/notifications/:userId', userController.getNotifications)
router.post('/like', userController.likeArticle);
router.post('/comment', userController.commentOnArticle);
router.post('/subscribe', userController.subscribeToACategory);
router.get('/subscribedCategories/:userId', userController.subscribedCategories);
router.get('/activity/:userId', userController.getUserActivity);

module.exports = router
