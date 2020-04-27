exports.getNamesOfAllEditors = (editorId) => {
    let query = "SELECT name FROM editor WHERE editor_id = '" + editorId + "'"
    return query;
}

exports.getPreviousArticleCount = (editorId) => {
    let query = "SELECT max(article_id) AS previous_article_no FROM article WHERE editor_id = '" + editorId + "'";
    return query;
}

exports.addArticle = (editor_id, article_id, headlines, body, create_time) => {
    let query = "INSERT INTO article (editor_id, article_id , headlines, body, create_time) VALUES ('" + editor_id + "','" + article_id + "','" + headlines + "', '" + body + "', '" + create_time + "')"
    return query;
}

exports.saveBelongsTo = (editor_id, article_id, category) => {
    let query = "INSERT INTO belongs_to VALUES ('" + editor_id + "','" + article_id + "','" + category + "')"
    return query
}

exports.updateArticle = (body, modified_time, article_id, editor_id) => {
    let query = "UPDATE article SET body='" + body + "', modified_time='" + modified_time + "' WHERE article_id ='" + article_id + "' AND editor_id ='" + editor_id + "'"
    return query
}

exports.getAllCategoryNames = (type) => {
    let query = "SELECT name FROM category WHERE name='" + type + "'"
    return query
}

exports.getBelongingArticles = (type) => {
    let query = `SELECT article_id, editor_id ` +
        `FROM belongs_to ` +
        `WHERE name = "${type}"`;
    return query
}

exports.getArticle = (articleId, editorId) => {
    let query = "SELECT name, headlines, body, create_time, modified_time " +
        "FROM article NATURAL JOIN editor " +
        "WHERE article_id ='" + articleId + "' AND editor_id ='" + editorId + "'"
    return query
}

exports.getBelongsTO = (articleId, editorId) => {
    let query = "SELECT name " +
        "FROM belongs_to " +
        "WHERE article_id ='" + articleId + "' AND editor_id ='" + editorId + "'"
    return query
}

exports.updateViews = (viewerId, editorId, articleId) => {
    let query = `INSERT INTO views (user_id,editor_id,article_id,r_time) VALUES (${viewerId},${editorId},${articleId}, NOW())`
    return query
}

exports.getAllCategories = () => {
    let query = "SELECT name FROM category";
    return query
}

exports.getLikes = (userId, articleId, editorId) => {
    let query = `SELECT * FROM likes WHERE user_id=${userId} and article_id=${articleId} and editor_id=${editorId}`;
    return query
}