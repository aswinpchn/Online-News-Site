// SJSU CMPE 226 Fall 2019 TEAM1

'use strict'

import constants from '../../../utils/constants'
import SQLHelper from '../../../models/sqlDB/helper'
import SQLQueries from '../../../models/sqlDB/analyticsQueries'

/**
 * Most liked articles.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.mostLikedArticles = async (req, res) => {
	try {
		// let query = "" +
		// "SELECT article_id, headlines, count(DISTINCT user_id) as likeCount " +
		// "FROM article NATURAL JOIN likes " +
		// "WHERE editor_id = " + req.params.editorId + " " +
		// "GROUP BY article_id,headlines " +
		// "ORDER BY likeCount DESC " +
		// "LIMIT 10";

		let query = SQLQueries.mostLikedArticles(req.params.editorId)
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

		// let query = "" +
		// "SELECT location, count(*) as viewCount " +
		// "FROM belongs_to NATURAL JOIN article NATURAL JOIN views JOIN user ON views.user_id = user.user_id " +
		// "WHERE belongs_to.name = '" + req.params.category + "' AND article.editor_id = " + req.params.editorId + " " +
		// "GROUP BY location";

		let query = SQLQueries.categoryReadByLocation(req.params.category, req.params.editorId)
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

exports.getArticleReadsByAge = async (req, res) => {
	try {

		// let query = `CALL getArticleReadsByAge(${req.body.editor_id}, "${req.body.age_bracket}");`;
		let query = SQLQueries.getArticleReadsByAge(req.body.editor_id, req.body.age_bracket);
		let result = await SQLHelper(query);

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0][0]);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


exports.getArticleReadsByTimeOfTheDay = async (req, res) => {
	try {
		// let query = `CALL getArticleReadsByTimeOfTheDay(${req.body.editor_id}, "${req.body.time_of_the_day}");`;
		let query = SQLQueries.getArticleReadsByTimeOfTheDay(req.body.editor_id, req.body.time_of_the_day)
		let result = await SQLHelper(query);

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result[0][0]);

	} catch (error) {
		console.log(`Error while getting user profile details ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}


// Commit and rollback is needed
exports.getMostFrequentlyReadArticles = async (req, res) => {
	try {
		var editor_id = req.params.editorId
		var response = {}
		// var query = "SELECT article_id,COUNT(user_id) as read_count FROM views WHERE editor_id = '" + editor_id + "' GROUP BY article_id"
		var query = SQLQueries.getGraphValues(editor_id)
		var graphvalues = await SQLHelper(query)
		// console.log(JSON.stringify(graphvalues))
		if (graphvalues.length > 0) {
			response.graph = []
			for (var i = 0; i < graphvalues.length; i++) {
				response.graph.push(graphvalues[i])
			}
		}

		// query = "SELECT article_id,editor_id,body,headlines,create_time,modified_time " +
		// 	"FROM article " +
		// 	"WHERE editor_id = '" + editor_id + "' AND article_id IN ( " +
		// 	"SELECT article_id " +
		// 	"FROM views " +
		// 	"WHERE editor_id = '" + editor_id + "' " +
		// 	"GROUP BY article_id " +
		// 	"HAVING COUNT(user_id) = " +
		// 	"(SELECT MAX(no_of_reads) " +
		// 	"FROM ( " +
		// 	"SELECT COUNT(user_id) as no_of_reads  " +
		// 	"FROM views " +
		// 	"WHERE editor_id= '" + editor_id + "' " +
		// 	"GROUP BY article_id) AS articles_read)" +
		// 	");"
		query = SQLQueries.getMostReadArticle(editor_id);
		var mostReadArticle = await SQLHelper(query);
		// console.log(JSON.stringify(mostReadArticle))
		if (mostReadArticle.length > 0) {
			response.mostReadArticle = mostReadArticle
		} else {
			response.message = constants.MESSAGES.NO_ARTICLE_PRESENT
		}
		// console.log(JSON.stringify(response))
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
	try {
		var editor_id = req.params.editorId
		var response = {}
		// var query = "SELECT category.name,COUNT(user_id) AS Read_Count " +
		// 	"FROM category LEFT JOIN ( views NATURAL JOIN belongs_to) ON belongs_to.name = category.name AND views.editor_id ='" + editor_id + "'" +
		// 	"GROUP BY category.name"
		var query = SQLQueries.getMostReadCategory(editor_id)
		var mostReadCategory = await (SQLHelper(query))
		// console.log(JSON.stringify(mostReadCategory))
		if (mostReadCategory.length > 0) {
			response.categoryvalue = []
			for (var i = 0; i < mostReadCategory.length; i++) {
				response.categoryvalue.push(mostReadCategory[i])
			}
		} else {
			response.message = constants.MESSAGES.NO_CATEGORY_PRESENT
		}

		// console.log(JSON.stringify(response))
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
