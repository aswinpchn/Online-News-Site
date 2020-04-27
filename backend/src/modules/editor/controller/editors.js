// SJSU CMPE 226 Fall 2019 TEAM1

'use strict'

import constants from '../../../utils/constants'
import SQLQueries from '../../../models/sqlDB/editorQueries'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'


/**
 * Create editor AND save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createEditor = async (req, res) => {
	try {
		let createdUser
		var query
		var userData = req.body
		if (!isUniqueEmail(userData.email)) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		userData.password = EncryptPassword(userData.password)
		query = SQLQueries.createEditor(userData.name, userData.email, userData.password)
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
	try {
		var query = SQLQueries.getEditorProfile(req.params.editorId)
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
exports.updateEditorProfile = async (req, res) => {
	try {
		
		if (req.body.email == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}
		
		var query = SQLQueries.getEditorIdByEmail(req.body.email)
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}
		
		query = SQLQueries.checkDuplicateEmail(req.body.email, req.body.editorId)
		var result = await SQLHelper(query)
		if(result.length > 0) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = ""
		let editorObj = req.body

		// updating with or without password
		if(req.body.password) {
			editorObj.password = EncryptPassword(req.body.password)
			query = SQLQueries.updateWithPassword(editorObj.email, editorObj.name, editorObj.editorId, editorObj.password)
		} else {	
			query = SQLQueries.updateWithoutPassword(editorObj.email, editorObj.name, editorObj.editorId)
		}

		await SQLHelper(query)
		return res.status(200).json()
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}