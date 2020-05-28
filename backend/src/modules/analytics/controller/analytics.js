// SJSU CMPE 226 Fall 2019 TEAM1

'use strict'

import constants from '../../../utils/constants'
import SQLHelper from '../../../models/sqlDB/helper'
import SQLQueries from '../../../models/sqlDB/analyticsQueries'
import logger from '../../../../config/logger';

/**
 * Most liked articles.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.mostLikedArticles = async (req, res) => {
	logger.info('Inside ' + req.originalUrl);
	try {

		let query = SQLQueries.mostLikedArticles(req.params.editorId)
		let result = await SQLHelper(query)

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(result));
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		console.log(`Error while creating user ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
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
	logger.info('Inside ' + req.originalUrl);

	try {

		let query = SQLQueries.categoryReadByLocation(req.params.category, req.params.editorId)
		let result = await SQLHelper(query)

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(result));

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		console.log(`Error while creating user ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getArticleReadsByAge = async (req, res) => {
	logger.info('Inside ' + req.originalUrl + ' Body ' + JSON.stringify(req.body));

	try {
		// let condition;
		// if(req.body.age_bracket == "0-18")
		// 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) < 18';
		// else if(req.body.age_bracket == "18-40")
		// 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40';
		// else if(req.body.age_bracket == "40-60")
		// 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60';
		// else
		// 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 60';
		// let query = `SELECT COUNT(*) count` +
		// 	` FROM views V, user U` +
		// 	` WHERE V.user_id = U.user_id AND V.editor_id = ${req.body.editor_id} AND ${condition};`;

		// DELIMITER $$;
		// CREATE PROCEDURE getArticleReadsByAge(IN editor_id INT, IN age_bracket varchar(20))
		// 	IF age_bracket = "0-18" THEN
		// 		SELECT COUNT(*) count
		// 		FROM views V, user U
		// 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) < 18;
		// 	ELSEIF age_bracket = "18-40" THEN
		// 		SELECT COUNT(*) count
		// 		FROM views V, user U
		// 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40;
		// 	ELSEIF age_bracket = "40-60" THEN
		// 		SELECT COUNT(*) count
		// 		FROM views V, user U
		// 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60;
		// 	ELSE
		// 		SELECT COUNT(*) count
		// 		FROM views V, user U
		// 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 60;
		// 	END IF;
		// END $$

		let query = `CALL getArticleReadsByAge(${req.body.editor_id});`;
		let result = await SQLHelper(query);

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(result[0]));

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0]);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


exports.getArticleReadsByTimeOfTheDay = async (req, res) => {
	logger.info('Inside ' + req.originalUrl + ' Body ' + JSON.stringify(req.body));
	try {

		// let condition;
		// if(req.body.time_of_the_day == "10PM-6AM")
		// 	condition = 'HOUR(r_time) >= 22 OR HOUR(r_time) < 6';
		// else if(req.body.time_of_the_day == "6AM-2PM")
		// 	condition = 'HOUR(r_time) >= 6 AND HOUR(r_time) < 14';
		// else
		// 	condition = 'HOUR(r_time) >= 14 AND HOUR(r_time) < 22';
		// let query = `SELECT COUNT(*) count` +
		// 	` FROM views` +
		// 	` WHERE editor_id = ${req.body.editor_id} AND ${condition};`;

		// DELIMITER $$;
		// CREATE PROCEDURE getArticleReadsByTimeOfTheDay(IN editor_id INT, IN time_of_the_day varchar(20))
		// 	IF time_of_the_day = "10PM-6AM" THEN
		// 		SELECT COUNT(*) count
		// 		FROM views
		// 		WHERE editor_id = editor_id AND HOUR(r_time) >= 22 OR HOUR(r_time) < 6;
		// 	ELSE 
		// 		IF time_of_the_day = "6AM-2PM" THEN
		// 			SELECT COUNT(*) count
		// 			FROM views
		// 			WHERE editor_id = editor_id AND HOUR(r_time) >= 6 OR HOUR(r_time) < 14;
		// 		ELSE
		// 			SELECT COUNT(*) count
		// 			FROM views
		// 			WHERE editor_id = editor_id AND HOUR(r_time) >= 14 OR HOUR(r_time) < 22;
		// 		END IF;
		// 	END IF;
		// END $$
		// DELIMITER; $$

		let query = `CALL getArticleReadsByTimeOfTheDay(${req.body.editor_id});`;

		let result = await SQLHelper(query);

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(result[0]));

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0]);

	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


exports.getMostFrequentlyReadArticles = async (req, res) => {
	logger.info('Inside ' + req.originalUrl);

	try {
		var editor_id = req.params.editorId
		var response = {}
		var query = SQLQueries.getGraphValues(editor_id)
		var graphvalues = await SQLHelper(query)

		if (graphvalues.length > 0) {
			response.graph = []
			for (var i = 0; i < graphvalues.length; i++) {
				response.graph.push(graphvalues[i])
			}
		}

		query = SQLQueries.getMostReadArticle(editor_id);
		var mostReadArticle = await SQLHelper(query);

		if (mostReadArticle.length > 0) {
			response.mostReadArticle = mostReadArticle
		} else {
			response.message = constants.MESSAGES.NO_ARTICLE_PRESENT
		}

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(response));
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(response);
	} catch (error) {
		console.log(`Error while getting most frquently read article ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


exports.getMostFrequentlyReadCategories = async (req, res) => {
	logger.info('Inside ' + req.originalUrl);

	try {
		var editor_id = req.params.editorId
		var response = {}
		var query = SQLQueries.getMostReadCategory(editor_id)
		var mostReadCategory = await (SQLHelper(query))

		if (mostReadCategory.length > 0) {
			response.categoryvalue = []
			for (var i = 0; i < mostReadCategory.length; i++) {
				response.categoryvalue.push(mostReadCategory[i])
			}
		} else {
			response.message = constants.MESSAGES.NO_CATEGORY_PRESENT
		}

		logger.info('Returning from ' + req.originalUrl + constants.STATUS_CODE.SUCCESS_STATUS + JSON.stringify(response));

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(response);
	} catch (error) {
		console.log(`Error while getting most frquently read article ${error}`)

		logger.info('Error in ' + req.originalUrl + constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS + error.message);
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}