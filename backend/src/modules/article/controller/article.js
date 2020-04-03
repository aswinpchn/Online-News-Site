'use strict'


import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import SQLHelper from '../../../models/sqlDB/helper'
import Article from '../../../models/mongoDB/article'


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


		/*
		Creating a new article document in Article collection.
		 */
		let newArticle = new Article({
			articleId: article_id,
			editorId: articleData.editor_id,
			likeCount: 0,
			commentCount: 0,
			comments: []
		});

		let createdArticle = await newArticle.save();
		console.log(createdArticle);



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
 * Update a article written by the editor in database.
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
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.EDITOR_DOES_NOT_EXIST)
		}
		
		query = "UPDATE article SET body='" +articleData.body + "', modified_time='" + modified_time + "' WHERE article_id ='" + articleData.article_id +"' AND editor_id ='" + articleData.editor_id +"'"
		var result = await SQLHelper(query)
		
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send("Updated Article Successfully")
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}

}

/**
 * Update a article written by the editor in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getHeadlines = async (req, res) => {

	var query
	try {
		
		var type = req.query.type
		
		if(type.toLowerCase() == 'all'){
			query = "SELECT article_id,editor_id,headlines FROM article"
			var allheadline = await SQLHelper(query)
			return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allheadline)
		}else{
			query = "SELECT name FROM category WHERE name='" + type +"'"
			var exists =await SQLHelper(query)
			if(exists.length <= 0){
				console.log("Invalid option")
				return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("Invalid option : " + type)
			}

			query = "SELECT article.article_id,editor.editor_id,headlines FROM article JOIN editor ON article.editor_id = editor.editor_id  JOIN belongs_to ON article.editor_id = belongs_to.editor_id AND belongs_to.article_id = article.article_id WHERE belongs_to.name = '"+ type + "' "
			var headlinesForCategory = await SQLHelper(query)
			if (headlinesForCategory.length > 0){
				console.log("Category :" + type + "Headlines \n" + JSON.stringify(headlinesForCategory))
				return res
				.status(constants.STATUS_CODE.SUCCESS_STATUS)
				.send(headlinesForCategory)
			}
		}
		
	} catch (error) {
		console.log(`Error while retrieving headlines ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}

}


/**
 * Update a article written by the editor in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getArticle = async (req, res) => {

	var query
	var resultArticle ={}
	console.log(req.params)
	try {
		
		query = "SELECT name, headlines, body, create_time, modified_time " +
				"FROM article NATURAL JOIN editor " +
				"WHERE article_id ='" + req.params.articleId + "' AND editor_id ='" + req.params.editorId +"'"
		var article = await SQLHelper(query)
		if (article.length <= 0) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_NOT_FOUND)
		}else{
			resultArticle.name = article[0].name
			resultArticle.headlines = article[0].headlines
			resultArticle.body = article[0].body
			if(article[0].modified_time != null){
				resultArticle.lastModified = article[0].modified_time
			}else{
				resultArticle.lastModified = article[0].create_time
			}
			
		}
		
		query = "SELECT name " + 
				"FROM belongs_to " +
				"WHERE article_id ='" + req.params.articleId + "' AND editor_id ='" + req.params.editorId +"'"
		var categories = await SQLHelper(query)
		if (categories.length <= 0) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.INVALID_RESULT)
		}else{
			var allCategories = []
			for (var index in categories) {
				allCategories.push(categories[index].name)
			}
			resultArticle.categories = allCategories
		}
		
		
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(resultArticle)
	} catch (error) {
		console.log(`Error while  retrieving article ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}

}


/**
 * Get list of categories available.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllCategories = async (req, res) => {

	try {
		let query ="SELECT name FROM category";
		var categories = await SQLHelper(query)
		if (categories.length <= 0) {
			return res
				.status(constants.STATUS_CODE.NOT_FOUND_STATUS)
				.send(constants.MESSAGES.NO_CATEGORY_PRESENT)
		}else{
			return res
				.status(constants.STATUS_CODE.SUCCESS_STATUS)
				.send(categories)
		}
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}

}
