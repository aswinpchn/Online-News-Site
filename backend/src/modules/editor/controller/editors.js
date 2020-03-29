'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword, validatePassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'


/**
 * Create editor AND save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createEditor = async (req, res) => {
	let createdUser
	var query
	var userData = req.body
	try {
		// userData = {
		// 	email : "jayasurya.pinaki@sjsu.edu",
		// 	password : EncryptPassword("password123"),
		// 	name : "Jayasurya",
		// }
		
		if (!isUniqueEmail(userData.email)) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		userData.password = EncryptPassword(userData.password)
		query = "INSERT INTO editor (name, email, password) VALUES ('" + userData.name + "', '" + userData.email + "', '" + userData.password + "')"
		await SQLHelper(query)
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdUser)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get editor profile details based on editorid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getEditorProfile = async (req, res) => {
	var query
	try {
		query = "SELECT email, name FROM editor WHERE editor_id = '" + req.params.editorId + "'"
		let details = await SQLHelper(query)

		if (details.length > 0) {
			details = details[0]
			return res.status(200).send(details)
		} else {
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Update editor details based on editorid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.updateEditorProfile = async (req, res) => {
	var query
	try {
		
		// req = {
		// 	body :{
		// 		userId : 1,
		// 		email : "jayasurya.editor@sjsu.edu",
		// 		password : EncryptPassword("password123"),
		// 		name : "Jayasurya"
		// 	}
		// }
		if (req.body.email == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}
		
		query = "SELECT user_id FROM user WHERE email = '" + req.body.email + "'"
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}
		
		query = "SELECT editor_id FROM editor WHERE email = '" + email + "' AND editor_id != '" + req.body.userId + "'"
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		let userObj = req.body

		// updating with or without password
		if(req.body.password) {
			userObj.password = EncryptPassword(req.body.password)
			query = "UPDATE user (email, password, name) VALUES ('" + userObj.email + "', '" + userObj.password + "', '" + userObj.name + "' WHERE editor_id = '" + userObj.userId + "'"
		} else {	
			query = "UPDATE user (email, name) VALUES ('" + userObj.email + "', '" + userObj.name + "' WHERE editor_id = '" + userObj.userId + "'"
		}

		await SQLHelper(query)
		return res.status(200).json()
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getArticleReadsByTimeOfTheDay = async (req, res) => {
	console.log(req.body);

	try {

		let condition;

		if(req.body.time_of_the_day == "10PM-6AM")
			condition = 'HOUR(r_time) >= 22 OR HOUR(r_time) < 6';
		else if(req.body.time_of_the_day == "6AM-2PM")
			condition = 'HOUR(r_time) >= 6 AND HOUR(r_time) < 14';
		else
			condition = 'HOUR(r_time) >= 14 AND HOUR(r_time) < 22';

		let query = `SELECT COUNT(*) count` +
			` FROM views` +
			` WHERE editor_id = ${req.body.editor_id} AND ${condition};`;

		let result = await SQLHelper(query);
		//console.log(result);

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0]);

	} catch(error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.getArticleReadsByAge = async (req, res) => {
	console.log(req.body);

	try {
		let condition;

		if(req.body.age_bracket == "0-18")
			condition = '(YEAR(NOW()) - YEAR(U.DOB)) < 18';
		else if(req.body.age_bracket == "18-40")
			condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40';
		else if(req.body.age_bracket == "40-60")
			condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60';
		else
			condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 60';

		let query = `SELECT COUNT(*) count` +
			` FROM views V, user U` +
			` WHERE V.user_id = U.user_id AND V.editor_id = ${req.body.editor_id} AND ${condition};`;

		let result = await SQLHelper(query);
		//console.log(result);

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0]);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


exports.getArticleReadsByTimeOfTheDay = async (req, res) => {
	console.log(req.body);

	try {

		let condition;

		if(req.body.time_of_the_day == "10PM-6AM")
			condition = 'HOUR(r_time) >= 22 OR HOUR(r_time) < 6';
		else if(req.body.time_of_the_day == "6AM-2PM")
			condition = 'HOUR(r_time) >= 6 AND HOUR(r_time) < 14';
		else
			condition = 'HOUR(r_time) >= 14 AND HOUR(r_time) < 22';

		let query = `SELECT COUNT(*) count` +
			` FROM views` +
			` WHERE editor_id = ${req.body.editor_id} AND ${condition};`;

		let result = await SQLHelper(query);
		//console.log(result);

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0]);

	} catch(error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.getMostFrequentlyReadArticles = async (req, res) => {
	console.log(req.body);
	var editor_id = req.params.editorId
	var response ={}
	try {
		var query = "SELECT article_id,COUNT(user_id) as read_count FROM views WHERE editor_id = '" + editor_id + "' GROUP BY article_id"
		var graphvalues = await SQLHelper(query)
		console.log(JSON.stringify(graphvalues))
			if(graphvalues.length > 0){
					response.graph = []
					for(var i =0 ; i< graphvalues.length ; i++){
						response.graph.push(graphvalues[i])
					}
			}

		 query = "SELECT article_id,editor_id,body,headlines,create_time,modified_time " + 
				"FROM article " +
				"WHERE editor_id = '"+ editor_id +"' AND article_id IN ( " +
						"SELECT article_id " +
							"FROM views " +
						"WHERE editor_id = '"+ editor_id +"' " +
						"GROUP BY article_id " +
						"HAVING COUNT(user_id) = " + 
								"(SELECT MAX(no_of_reads) " + 
									"FROM ( " +
										"SELECT COUNT(user_id) as no_of_reads  " +
										"FROM views " +
										"WHERE editor_id= '"+ editor_id +"' " + 
										"GROUP BY article_id) AS articles_read)" +
							");"
		var mostReadArticle = await SQLHelper(query)
		console.log(JSON.stringify(mostReadArticle))
		if(mostReadArticle.length > 0){
			response.mostReadArticle = mostReadArticle 
		}else{
			response.message = constants.MESSAGES.NO_ARTICLE_PRESENT
		}
		console.log(JSON.stringify(response))	
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(response);
	} catch (error) {
		console.log(`Error while getting most frquently read article ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}



exports.getMostFrequentlyReadCategories = async (req, res) => {
	console.log(req.body);
	var editor_id = req.params.editorId
	var response ={}
	try {
		var query = "SELECT category.name,COUNT(user_id) AS Read_Count " +
		"FROM category LEFT JOIN ( views NATURAL JOIN belongs_to) ON belongs_to.name = category.name AND views.editor_id ='" + editor_id + "'" + 
		"GROUP BY category.name"
		var mostReadCategory = await(SQLHelper(query))
		console.log(JSON.stringify(mostReadCategory))
		if(mostReadCategory.length > 0){
			response.categoryvalue = []
					for(var i =0 ; i< mostReadCategory.length ; i++){
						response.categoryvalue.push(mostReadCategory[i])
					}
		}else{
			response.message = constants.MESSAGES.NO_CATEGORY_PRESENT
		}
		
		console.log(JSON.stringify(response))	
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(response);
	} catch (error) {
		console.log(`Error while getting most frquently read article ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


