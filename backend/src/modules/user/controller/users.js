'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword, validatePassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'
import log4js from 'log4js';

exports.dummy = async(req, res) => {
	const logger = log4js.getLogger('log');
	logger.info('Inside the dummy method in user!');
	return res
		.status(constants.STATUS_CODE.ACCEPTED_STATUS)
		.send("Dummy")
}

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createUser = async (req, res) => {
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

		query = "INSERT INTO user (name, DOB, location, sex, email, password) VALUES ('" + userData.name + "', '" + userData.DOB + "', '" + userData.location + "', '" + userData.sex + "', '" + userData.email + "', '" + userData.password + "')"
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
 * Login user and send auth token and user details in response.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.loginUser = async (req, res) => {
	try {
		var user,
			isAuth = false,
			query,
			loginData = req.body
		// var loginData = {
		// 	email : "jayasurya.pinaki@sjsu.edu",
		// 	password : "password123"
		// }

		query = "SELECT user_id, password from user where email = '" + loginData.email + "'"
		user = await SQLHelper(query)

		if (user.length > 0) {
			const validate = validatePassword(loginData.password, user[0].password)
			if (validate) {
				user = user[0]
				delete user.password
				user['type'] = "User"
				isAuth = true
				return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(user)
			}
		}

		query = "SELECT editor_id, password from editor where email = '" + loginData.email + "'"
		user = await SQLHelper(query)

		if (user.length > 0) {
			const validate = validatePassword(loginData.password, user[0].password)
			if (validate) {
				user = user[0]
				delete user.password
				user['type'] = "Editor"
				isAuth = true
				return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(user)
			}
		}

		if (!isAuth) {
			return res
				.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS)
				.send(constants.MESSAGES.AUTHORIZATION_FAILED)
		}
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get user profile details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getUserProfile = async (req, res) => {
	var query
	try {
		query = "SELECT email, name, sex, DOB, location from user where user_id = '" + req.params.userId + "'"
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
 * Update user details based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.updateUserProfile = async (req, res) => {
	try {
		
		// req = {
		// 	body :{
		// 		userId : 5,
		// 		email : "jayasurya.pinaki@sjsu.edu",
		// 		password : EncryptPassword("password123"),
		// 		name : "Jayasurya",
		// 		sex : "M",
		// 		DOB : "1996-08-17",
		// 		location : "CA"
		// 	}
		// }
		if (req.body.email == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}
		
		query = "SELECT user_id from user where email = '" + req.body.email + "' and user_id != '" + req.body.userId + "'"
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}
		
		query = "SELECT editor_id from editor where email = '" + email + "'"
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = ""
		let userObj = req.body

		// updating with or without password
		if(req.body.password) {
			userObj.password = EncryptPassword(req.body.password)
			query = "UPDATE user (email, password, name, sex, DOB, location) VALUES ('" + userObj.email + "', '" + userObj.password + "', '" + userObj.name + "', '" + userObj.sex + "', '" + userObj.DOB + "', '" + userObj.location + "' WHERE user_id = '" + userObj.userId + "'"
		} else {	
			query = "UPDATE user (email, name, sex, DOB, location) VALUES ('" + userObj.email + "', '" + userObj.name + "', '" + userObj.sex + "', '" + userObj.DOB + "', '" + userObj.location + "' WHERE user_id = '" + userObj.userId + "'"
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

/**
 * Get notifications for user based on userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getNotifications = async (req, res) => {
	var query
	try {
		query = "\
			SELECT name, article_id, editor_id, headlines, c_time " +
			"FROM comments NATURAL JOIN ( " +
				"SELECT min(c_time) AS mintime, editor_id, article_id " +
				"FROM comments " + 
				"WHERE user_id =" + req.params.userId +
				"GROUP BY editor_id, article_id " +
			") A NATURAL JOIN article NATURAL JOIN user" +
			"WHERE user_id != " + req.params.userId + " AND mintime <= c_time;";
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

exports.likeArticle = async (req, res) => {
	let likeData =  req.body;
	console.log(likeData);
	try {
		let editorId = await SQLHelper("SELECT editor_id" +
			" FROM article" +
			" WHERE article_id =" + likeData.article_id);

		// console.log(JSON.parse(JSON.stringify(editorId))[0].editor_id);

		likeData.editorId = JSON.parse(JSON.stringify(editorId))[0].editor_id;

		let query = `INSERT INTO` +
			` likes (user_id, article_id, editor_id, l_time)` +
			` VALUES ( ${likeData.user_id} , ${likeData.article_id} , ${likeData.editorId} , NOW() );`;

		let result = await SQLHelper(query);

		// console.log(result);

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(likeData);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		if(error.code != null && error.code == 'ER_DUP_ENTRY')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("You have already like this article before");

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.commentOnArticle = async (req, res) => {
	let commentData =  req.body;
	console.log(commentData);
	try {
		let editorId = await SQLHelper("SELECT editor_id" +
			" FROM article" +
			" WHERE article_id =" + commentData.article_id);

		// console.log(JSON.parse(JSON.stringify(editorId))[0].editor_id);

		commentData.editorId = JSON.parse(JSON.stringify(editorId))[0].editor_id;

		let query = `INSERT INTO` +
			` comments (user_id, article_id, editor_id, text, c_time)` +
			` VALUES ( ${commentData.user_id} , ${commentData.article_id} , ${commentData.editorId} , '${commentData.text}' , NOW() );`;

		let result = await SQLHelper(query);

		// console.log(result);

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(commentData);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.subscribeToACategory = async (req, res) => {
	let subscribeData =  req.body;
	console.log(subscribeData);
	try {

		let query = `INSERT INTO` +
			` subscribed_to (user_id, name, s_time)` +
			` VALUES ( ${subscribeData.user_id} , '${subscribeData.category_name}' , NOW() );`;

		let result = await SQLHelper(query);

		 console.log(result);

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(subscribeData);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		console.log(error);

		if(error.code = 'ER_NO_REFERENCED_ROW_2')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("There is no category with this category_name");
		
		if(error.code == 'ER_DUP_ENTRY')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("This user has already subscribed this category");

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}