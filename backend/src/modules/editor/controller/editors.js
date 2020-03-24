'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword, validatePassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'


/**
 * Create editor and save data in database.
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
		// 	sex : "M",
		// 	DOB : "1996-08-17",
		// 	location : "CA"
		// }
		
		if (!isUniqueEmail(userData.email)) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

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
		query = "SELECT email, name from editor where editor_id = '" + req.params.editorId + "'"
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
		
		query = "SELECT user_id from user where email = '" + req.body.email + "'"
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}
		
		query = "SELECT editor_id from editor where email = '" + email + "' and editor_id != '" + req.body.userId + "'"
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

		let query = `Select COUNT(*) count` +
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

		let query = `Select COUNT(*) count` +
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

