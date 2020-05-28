// SJSU CMPE 226 Fall 2019 TEAM1

'use strict'

import constants from '../../../utils/constants'
import SQLQueries from '../../../models/sqlDB/editorQueries'
import SQLHelper from '../../../models/sqlDB/helper'
import {
	EncryptPassword
} from '../../../utils/hashPassword'
import {
	isUniqueEmail
} from '../../../utils/validateEmail'
import logger from '../../../../config/logger';

/**
 * Create editor AND save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createEditor = async (req, res) => {
	logger.info('Inside ' + req.originalUrl + ' Body ' + JSON.stringify(req.body));
	try {
		let createdUser
		var query
		var userData = req.body
		if (!isUniqueEmail(userData.email)) {
			logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.CONFLICT_ERROR_STATUS + constants.MESSAGES.USER_ALREADY_EXISTS);
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		userData.password = EncryptPassword(userData.password)
		query = SQLQueries.createEditor(userData.name, userData.email, userData.password)
		await SQLHelper(query)

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS + JSON.stringify(createdUser));
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdUser)
	} catch (error) {
		console.log(`Error while creating user ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
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
	logger.info('Inside ' + req.originalUrl);
	try {
		var query = SQLQueries.getEditorProfile(req.params.editorId)
		let details = await SQLHelper(query)

		if (details.length > 0) {
			details = details[0]

			logger.info('Returning from ' + req.originalUrl + ' 200 ' + JSON.stringify(details));
			return res.status(200).send(details)
		} else {
			logger.info('Returning from ' + req.originalUrl + ' 204 ');
			return res.status(204).json()
		}
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
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
	logger.info('Inside ' + req.originalUrl + ' Body ' + JSON.stringify(req.body));
	try {

		if (req.body.email == undefined) {
			logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS + constants.MESSAGES.USER_VALUES_MISSING);
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}

		var query = SQLQueries.doesEmailExistForUser(req.body.email)
		var result = await SQLHelper(query)
		if (result[0][0].TRUE) {
			logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.CONFLICT_ERROR_STATUS + constants.MESSAGES.USER_ALREADY_EXISTS);
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = SQLQueries.checkDuplicateEmailForEditor(req.body.email, req.body.editorId)
		var result = await SQLHelper(query)
		if (result[0][0].TRUE) {
			logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.CONFLICT_ERROR_STATUS + constants.MESSAGES.USER_ALREADY_EXISTS);
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = ""
		let editorObj = req.body

		// updating with or without password
		if (req.body.password) {
			editorObj.password = EncryptPassword(req.body.password)
		}
		SQLQueries.updateEditorInformation(editorObj.email, editorObj.name, editorObj.editorId, editorObj.password)
		await SQLHelper(query)

		logger.info('Returning from ' + req.originalUrl + ' 200');
		return res.status(200).json()
	} catch (error) {

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}