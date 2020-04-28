// SJSU CMPE 226 Fall 2019 TEAM1

'use strict'

import constants from '../../../utils/constants'
import SQLConnection from '../../../models/sqlDB/index'
import SQLQueries from '../../../models/sqlDB/usersQueries'
import SQLHelper from '../../../models/sqlDB/helper'
import { EncryptPassword, validatePassword } from '../../../utils/hashPassword'
import { isUniqueEmail } from '../../../utils/validateEmail'
import log4js from 'log4js';
import Article from '../../../models/mongoDB/article'

exports.dummy = async (req, res) => {
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
	try {
		let createdUser
		var query
		var userData = req.body
		if (await isUniqueEmail(userData.email) === false) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		userData.password = EncryptPassword(userData.password)
		query = SQLQueries.createUser(userData.name, userData.DOB, userData.location, userData.sex, userData.email, userData.password)
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
		query = SQLQueries.loginUser(loginData.email)
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

		query = SQLQueries.loginEditor(loginData.email)
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
	try {
		
		let query = SQLQueries.getUserDetails(req.params.userId)
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
		if (req.body.email == undefined) {
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send(constants.MESSAGES.USER_VALUES_MISSING)
		}

		// var query = SQLQueries.getUserId(req.body.email, req.body.userId)
		var query = SQLQueries.checkDuplicateEmailForUser(req.body.email, req.body.userId)
		var result = await SQLHelper(query)
		if (result[0][0].TRUE) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = SQLQueries.getEditorId(req.body.email)
		var result = await SQLHelper(query)
		if (result[0][0].TRUE) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

		query = ""
		let userObj = req.body

		// updating with or without password
		if (req.body.password) {
			userObj.password = EncryptPassword(req.body.password)
		}
		query = SQLQueries.updateUserInformation(userObj.email, userObj.password, userObj.name, userObj.sex, userObj.DOB, userObj.location, userObj.userId)
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
	try {
		var query = SQLQueries.getNotifications(req.params.userId)
		let details = await SQLHelper(query)

		if (details.length > 0) {
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

// Learnt so much in depth about 3 types of asynchronus functions. See the AsynchronusFunctionsJS.txt for notes.
exports.likeArticleObsolete = async (req, res) => {
	try {
		let likeData = req.body;
		let query = `INSERT INTO` +
			` likes (user_id, article_id, editor_id, l_time)` +
			` VALUES ( ${likeData.user_id} , ${likeData.article_id} , ${likeData.editor_id} , NOW() );`;

		await SQLHelper(query);

		// console.log(result);

		/*
		Maintaing likeCount seperately, this way, for quickview, we can avoid SQL queries.
		 */
		let condition = {
			articleId: likeData.article_id,
			editorId: likeData.editor_id
		};
		let r = await Article.findOneAndUpdate(condition, { $inc: { likeCount: 1 } }, { new: true });
		//console.log(r);

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(likeData);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		if (error.code != null && error.code == 'ER_DUP_ENTRY')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("You have already like this article before");

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.likeArticle = async (req, res) => {
	await SQLConnection.beginTransaction()
	let mongoConnection = await Article.startSession();
	try {

		let likeData = req.body;
		let query = SQLQueries.addLikes(likeData.user_id, likeData.article_id, likeData.editor_id)
		await SQLConnection.query(query)
		let condition = {
			articleId: likeData.article_id,
			editorId: likeData.editor_id
		};
		likeData = await Article.findOneAndUpdate(condition, { $inc: { likeCount: 1 } }, { new: true })
		await mongoConnection.commitTransaction();
		await mongoConnection.endSession();
		await SQLConnection.commit()
		await SQLConnection.end()
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(likeData);
	} catch (error) {
		await mongoConnection.abortTransaction();
		await mongoConnection.endSession();
		await SQLConnection.rollback()
		await SQLConnection.end()
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

exports.commentOnArticle = async (req, res) => {
	try {
		let query = SQLQueries.commentOnArticle(req.body.user_id, req.body.article_id, req.body.editor_id, req.body.text)
		await SQLHelper(query);
		return res
		.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
		.send("");
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}

	try {
		/*
		Appending the comment to the article document, incrementing the commentCount.
		 */
		let condition = {
			articleId: commentData.article_id,
			editorId: commentData.editor_id
		};
		let comment = {
			userId: commentData.user_id,
			text: commentData.text,
			commentTime: Date.now()
		}
		//console.log(comment);
		let r = await Article.findOneAndUpdate(condition, { $push: { comments: comment }, $inc: { commentCount: 1 } }, { new: true });
		//console.log(r);


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
	try {
		let subscribeData = req.body;
		let query = SQLQueries.subscribeToACategory(subscribeData.user_id, subscribeData.category_name)
		await SQLHelper(query);

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(subscribeData);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		if (error.code = 'ER_NO_REFERENCED_ROW_2')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("There is no category with this category_name");

		if (error.code == 'ER_DUP_ENTRY')
			return res
				.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS)
				.send("This user has already subscribed this category");

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

/*
* This api deals with views, likes, comments and subscribed tables.
* For a given user, his views, liked, comments and subscribed history is retrieved.
* The result is sent back as array in chronological order.
*/
exports.getUserActivity = async (req, res) => {
	try {
		let userId = req.params.userId;
		let activity = [];
		
		let viewedQuery = SQLQueries.getViews(userId)
		let viewedResult = await SQLHelper(viewedQuery);

		for (let i = 0; i < JSON.parse(JSON.stringify(viewedResult)).length; i++) {
			activity.push(JSON.parse(JSON.stringify(viewedResult))[i]);
		}
		
		let likedQuery = SQLQueries.getLikes(userId)
		let likedResult = await SQLHelper(likedQuery);

		for (let i = 0; i < JSON.parse(JSON.stringify(likedResult)).length; i++) {
			activity.push(JSON.parse(JSON.stringify(likedResult))[i]);
		}
		
		/*
		Get the whole article collection, go through each articles comment, finding the given user's comments.
		 */
		let r = await Article.find({});
		//console.log(r);
		for (let i = 0; i < r.length; i++) {
			for (let j = 0; j < r[i].comments.length; j++) {
				if (r[i].comments[j].userId == userId) {
					let data = {};
					data.article_id = r[i].articleId;
					data.editor_id = r[i].editorId;
					data.content = r[i].headline;
					data.type = "commented";
					data.time = r[i].comments[j].commentTime;
					activity.push(data);
				}
			}
		}

		let subscribedQuery = SQLQueries.getSubscribes(userId)
		let subscribedResult = await SQLHelper(subscribedQuery);

		for (let i = 0; i < JSON.parse(JSON.stringify(subscribedResult)).length; i++) {
			activity.push(JSON.parse(JSON.stringify(subscribedResult))[i]);
		}
		
		activity.sort((a, b) => {
			// console.log(a.time + " --------- " + b.time);
			// console.log(Date.parse(a.time) + " --------- " + Date.parse(b.time));
			// console.log(Date.parse(a.time) - Date.parse(b.time));
			// a.time and b.time can't be compare directly, we have to use Date.parse to first them seperately and then sort them.
			return Date.parse(a.time) - Date.parse(b.time);
		});
		
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(activity);
	} catch (error) {
		console.log(`Error while getting user profile details ${error}`);

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
}

/**
 * Get list of all categories subscribed by an user.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.subscribedCategories = async (req, res) => {
	try {
		let query,
			subscribedCategories = [],
			result,
			index;
		query = SQLQueries.getSubscribedTo(req.params.userId)
		result = await SQLHelper(query);

		for (index in result) {
			subscribedCategories.push(result[index].name.toLowerCase());
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(subscribedCategories);
	} catch (error) {
		console.log(`Error while getting subscribed category details ${error}`);

		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message);
	}
};