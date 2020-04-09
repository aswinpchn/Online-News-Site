'use strict'

//import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import model from '../../../models/sqlDB/index'
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
  let createdUser
  var query
  var userData = req.body
  console.log(req.body)
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

    userData.password = EncryptPassword(userData.password)
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

    query = "SELECT user_id, name, password from user where email = '" + loginData.email + "'"
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

    query = "SELECT editor_id as user_id, name, password from editor where email = '" + loginData.email + "'"
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

    var query = "SELECT user_id from user where email = '" + req.body.email + "' and user_id != '" + req.body.userId + "'"
    var result = await SQLHelper(query)
    if (result.length > 0) {
      return res
        .status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
        .send(constants.MESSAGES.USER_ALREADY_EXISTS)
    }

    query = "SELECT editor_id from editor where email = '" + req.body.email + "'"
    var result = await SQLHelper(query)
    if (result.length > 0) {
      return res
        .status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
        .send(constants.MESSAGES.USER_ALREADY_EXISTS)
    }

    query = ""
    let userObj = req.body

    // updating with or without password
    if (req.body.password) {
      userObj.password = EncryptPassword(req.body.password)
      query = `UPDATE user SET email = "${userObj.email}", password = "${userObj.password}", name = "${userObj.name}", sex = "${userObj.sex}", DOB = "${userObj.DOB}", location = "${userObj.location}" WHERE user_id = ${userObj.userId}`
    } else {
      query = `UPDATE user SET email = "${userObj.email}", name = "${userObj.name}", sex = "${userObj.sex}", DOB = "${userObj.DOB}", location = "${userObj.location}" WHERE user_id = ${userObj.userId}`
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

    query = "( " +
      "SELECT NULL as name, A.editor_id as editor_id, A.article_id as article_id, A.headlines as headlines, A.create_time as time, 'NEW' as status " +
      "FROM article A JOIN ( " +
      "SELECT editor_id, article_id, name, s_time " +
      "FROM belongs_to NATURAL JOIN ( " +
      "SELECT name, s_time " +
      "FROM subscribed_to " +
      "WHERE user_id = " + req.params.userId +
      ") innerTable " +
      ") B ON A.editor_id = B.editor_id AND A.article_id = B.article_id AND A.create_time > B.s_time " +
      ") " +
      "UNION" +
      " ( " +
      "SELECT NULL as name, A.editor_id as editor_id, A.article_id as article_id, A.headlines as headlines, A.modified_time as time, 'MODIFIED' as status " +
      "FROM article A JOIN ( " +
      "SELECT editor_id, article_id, name, s_time " +
      "FROM belongs_to NATURAL JOIN ( " +
      "SELECT name, s_time " +
      "FROM subscribed_to " +
      "WHERE user_id =" + req.params.userId +
      ") innerTable " +
      ") B ON A.editor_id = B.editor_id AND A.article_id = B.article_id AND A.modified_time > B.s_time " +
      ") " +
      "UNION" +
      " ( " +
      "SELECT name, editor_id, article_id, headlines, c_time as time, 'COMMENTS' as status " +
      "FROM comments NATURAL JOIN ( " +
      "SELECT min(c_time) AS mintime, editor_id, article_id " +
      "FROM comments " +
      "WHERE user_id = " + req.params.userId + " " +
      "GROUP BY editor_id, article_id " +
      ") A NATURAL JOIN article NATURAL JOIN user " +
      "WHERE user_id != " + req.params.userId + " AND mintime <= c_time " +
      ") " +
      "ORDER BY time desc";

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

exports.likeArticle = async (req, res) => {
  let likeData = req.body;
  console.log(likeData);
  try {

    let query = `INSERT INTO` +
      ` likes (user_id, article_id, editor_id, l_time)` +
      ` VALUES ( ${likeData.user_id} , ${likeData.article_id} , ${likeData.editor_id} , NOW() );`;

    let result = await SQLHelper(query);

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

exports.commentOnArticle = async (req, res) => {
  let commentData = req.body;
  console.log(commentData);
  try {

    let query = `INSERT INTO` +
      ` comments (user_id, article_id, editor_id, text, c_time)` +
      ` VALUES ( ${commentData.user_id} , ${commentData.article_id} , ${commentData.editor_id} , '${commentData.text}' , NOW() );`;

    let result = await SQLHelper(query);
    // console.log(result);


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
  let subscribeData = req.body;
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
    console.log(userId);

    let activity = [];

    let viewedQuery = `SELECT A.article_id, A.editor_id, A.headlines content,  r_time time, 'viewed' as type` +
      ` FROM views V, article A` +
      ` WHERE V.user_id = ${userId} and V.article_id = A.article_id and V.editor_id = A.editor_id;`;

    let viewedResult = await SQLHelper(viewedQuery);

    for (let i = 0; i < JSON.parse(JSON.stringify(viewedResult)).length; i++) {
      activity.push(JSON.parse(JSON.stringify(viewedResult))[i]);
    }
    //console.log(activity);


    let likedQuery = `SELECT A.article_id, A.editor_id, A.headlines content, l_time time, 'liked' as type ` +
      ` FROM likes L, article A` +
      ` WHERE L.user_id = ${userId} and L.article_id = A.article_id and L.editor_id = A.editor_id;`;

    let likedResult = await SQLHelper(likedQuery);

    for (let i = 0; i < JSON.parse(JSON.stringify(likedResult)).length; i++) {
      activity.push(JSON.parse(JSON.stringify(likedResult))[i]);
    }
    //console.log(activity);


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


    let subscribedQuery = `SELECT null as article_id, null as editor_id, C.name content, s_time time, 'subscribed' as type ` +
      ` FROM subscribed_to S, category C` +
      ` WHERE S.user_id = ${userId} and S.name = C.name;`;

    let subscribedResult = await SQLHelper(subscribedQuery);

    for (let i = 0; i < JSON.parse(JSON.stringify(subscribedResult)).length; i++) {
      activity.push(JSON.parse(JSON.stringify(subscribedResult))[i]);
    }
    //console.log(activity);

    activity.sort((a, b) => {
      // console.log(a.time + " --------- " + b.time);
      // console.log(Date.parse(a.time) + " --------- " + Date.parse(b.time));
      // console.log(Date.parse(a.time) - Date.parse(b.time));
      // a.time and b.time can't be compare directly, we have to use Date.parse to first them seperately and then sort them.
      return Date.parse(a.time) - Date.parse(b.time);
    });
    // console.log(activity); After sorting.

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