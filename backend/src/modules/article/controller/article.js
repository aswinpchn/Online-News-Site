'use strict'


import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
import SQLHelper from '../../../models/sqlDB/helper'


/**
 * Save a article written by the editor in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.saveArticle = async (req, res) => {
	let createdArticle
	var query
	var articleData = req.body
	try {
		// articleData = {
		// 	editor_id : "1",
		// 	headlines : "My headline",
		// 	body : "My Body",
		// 	categories : ["Politics", "Business"]
		// }
		var date = new Date();
		var article_id 
		var create_time =  date.toISOString().slice(0, 19).replace('T', ' ');

		query = "SELECT name FROM editor WHERE editor_id = '" + articleData.editor_id + "'"
		var result = await SQLHelper(query)
		
		if (result.length <= 0) {
			console.log("editor does not exist")
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.EDITOR_DOES_NOT_EXIST)
		}
		
		query = "SELECT max(article_id) AS previous_article_no FROM article WHERE editor_id = '" + articleData.editor_id +"'"
		var result = await SQLHelper(query)
		if(result.length > 0){
			if(result[0].previous_article_no != null){
				article_id = result[0].previous_article_no + 1
			}else{
				article_id = 1;
			}
		}


		query = "INSERT INTO article (editor_id, article_id , headlines, body, create_time) VALUES ('" + articleData.editor_id + "','"+ article_id +"','" + articleData.headlines + "', '" + articleData.body + "', '" + create_time + "')"
		var result = await SQLHelper(query)
		console.log("Result : " + JSON.stringify(result, null, 2))
		

		var categories = articleData.categories
		for(var i =0 ;i < categories.length ; i++){
			query = "INSERT INTO belongs_to VALUES ('" + articleData.editor_id + "','"+ article_id + "','"+ categories[i] + "')"
			var result = await SQLHelper(query)
			console.log("Result : " + JSON.stringify(result, null, 2))	
		}

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send("Posted Article Successfully")
	} catch (error) {
		console.log(`Error while saving article ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Save a article written by the editor in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.modifyArticle = async (req, res) => {

	var query
	var articleData =   req.body
	try {
		// articleData = {
		// 	editor_id : "1",
		//	article_id : "",
		// 	body : "New  Body",
		// }
		var date = new Date();
		var modified_time =  date.toISOString().slice(0, 19).replace('T', ' ');

		query = "SELECT name FROM editor WHERE editor_id = '" + articleData.editor_id + "'"
		var result = await SQLHelper(query)
		
		if (result.length <= 0) {
			console.log("editor does not exist")
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.EDITOR_DOES_NOT_EXIST)
		}
		
		query = "UPDATE article SET body='" +articleData.body + "', modified_time='" + modified_time + "' WHERE article_id ='" + articleData.article_id +"' AND editor_id ='" + articleData.editor_id +"'"
		var result = await SQLHelper(query)
		console.log("Result : " + JSON.stringify(result, null, 2))
		
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send("Updated Article Successfully")
	} catch (error) {
		console.log(`Error while saving article ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}

}
