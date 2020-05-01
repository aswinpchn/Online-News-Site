import logger from '../../../config/logger';


// This query will get name of editor based on thier ID
exports.getNameOfEditor = (editorId) => {
    let query = "SELECT name FROM editor WHERE editor_id = '" + editorId + "'"

    logger.info('Executing Query ' + query);
    return query;
}

// This query will fetch the ID assigned to the previous article created by the editor
exports.getPreviousArticleCount = (editorId) => {
    let query = "SELECT max(article_id) AS previous_article_no FROM article WHERE editor_id = '" + editorId + "'";

    logger.info('Executing Query ' + query);
    return query;
}

// This query will store article information in the database 
exports.addArticle = (editor_id, article_id, headlines, body, create_time) => {
    let query = "INSERT INTO article (editor_id, article_id , headlines, body, create_time) VALUES ('" + editor_id + "','" + article_id + "','" + headlines + "', '" + body + "', '" + create_time + "')"

    logger.info('Executing Query ' + query);
    return query;
}

// This query will store information in the database regarding what category an article belongs to
exports.saveBelongsTo = (editor_id, article_id, category) => {
    let query = "INSERT INTO belongs_to VALUES ('" + editor_id + "','" + article_id + "','" + category + "')"

    logger.info('Executing Query ' + query);
    return query
}

// This query will update article body and modified time of the article
exports.updateArticle = (body, modified_time, article_id, editor_id) => {
    let query = "UPDATE article SET body='" + body + "', modified_time='" + modified_time + "' WHERE article_id ='" + article_id + "' AND editor_id ='" + editor_id + "'"

    logger.info('Executing Query ' + query);
    return query
}

// This stored procedure checks if the given category name is valid
exports.isValidCategoryName = (name) => {
    let query = `CALL isValidCategoryName("${name}")`

    logger.info('Executing Query ' + query);
    return query
}

// This query will retreive all articles belonging to a particular category
exports.getBelongingArticles = (type) => {
    let query = `SELECT article_id, editor_id ` +
        `FROM belongs_to ` +
        `WHERE name = "${type}"`;

    logger.info('Executing Query ' + query);
    return query
}

// This query will get article details along with the editor name, this data comes from the view.
exports.getArticle = (articleId, editorId) => {
    let query = "SELECT name, headlines, body, create_time, modified_time " +
        "FROM article_view " +
        "WHERE article_id ='" + articleId + "' AND editor_id ='" + editorId + "'"

    logger.info('Executing Query ' + query);
    return query
}

// This query will retreive name of the category a particular article belongs to
exports.getBelongsTO = (articleId, editorId) => {
    let query = "SELECT name " +
        "FROM belongs_to " +
        "WHERE article_id ='" + articleId + "' AND editor_id ='" + editorId + "'"

    logger.info('Executing Query ' + query);
    return query
}

// This query will insert a record into views table whenever a user views an article
exports.updateViews = (viewerId, editorId, articleId) => {
    let query = `INSERT INTO views (user_id,editor_id,article_id,r_time) VALUES (${viewerId},${editorId},${articleId}, NOW())`

    logger.info('Executing Query ' + query);
    return query
}

// This query will get names of all categories present in the application
exports.getAllCategories = () => {
    let query = "SELECT name FROM category";

    logger.info('Executing Query ' + query);
    return query
}

// This query will get the record of the like done by a user on a particular article 
exports.getLikes = (userId, articleId, editorId) => {
    let query = `SELECT * FROM likes WHERE user_id=${userId} and article_id=${articleId} and editor_id=${editorId}`;

    logger.info('Executing Query ' + query);
    return query
}

// This stored procedure checks if the user has already liked the article previously
exports.hasUserLikedTheArticle = (userId, articleId, editorId) => {
    let query = `CALL hasUserLikedTheArticle(${userId}, ${articleId}, ${editorId})`

    logger.info('Executing Query ' + query);
    return query
}