'use strict'

//import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword, validatePassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'


/**
 * Most liked articles.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.mostLikedArticles = async (req, res) => {
	try {

		let query = "" +
		"SELECT article_id, count(DISTINCT user_id) as likeCount " +
		"FROM article NATURAL JOIN likes " +
		"WHERE editor_id = " + req.params.editorId + " " +
		"GROUP BY article_id " +
		"ORDER BY likeCount DESC " +
		"LIMIT 10";
		
		let result = await SQLHelper(query)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Newspaper categories read by newsreaders based on their location.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.categoryReadByLocation = async (req, res) => {
	try {

		let query = "" +
		"SELECT location, count(*) as viewCount " +
		"FROM belongs_to NATURAL JOIN article NATURAL JOIN views JOIN user ON views.user_id = user.user_id " +
		"WHERE belongs_to.name = '" + req.params.category + "' AND article.editor_id = " + req.params.editorId + " " +
		"GROUP BY location";
		
		let result = await SQLHelper(query)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}