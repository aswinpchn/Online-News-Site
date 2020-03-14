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

		query = "INSERT INTO user (name, email, password) VALUES ('" + userData.name + "', '" + userData.email + "', '" + userData.password + "')"
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