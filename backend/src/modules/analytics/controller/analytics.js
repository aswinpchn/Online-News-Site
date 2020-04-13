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
