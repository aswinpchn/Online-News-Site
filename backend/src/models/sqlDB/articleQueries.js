exports.getNamesOfAllEditors = (editorId) => {
	let query = "SELECT name FROM editor WHERE editor_id = '" + editorId + "'"
    return query;
}

exports.getPreviousArticleCount = (editorId) => {
    let query = "SELECT max(article_id) AS previous_article_no FROM article WHERE editor_id = '" + editorId +"'";
    return query;
}

exports.addArticle = (editor_id, article_id, headlines, body, create_time) => {
    let query = "INSERT INTO article (editor_id, article_id , headlines, body, create_time) VALUES ('" + editor_id + "','"+ article_id +"','" + headlines + "', '" + body + "', '" + create_time + "')"
    return query;
}

exports.saveBelongsTo = (editor_id, article_id, category) => {
	let query = "INSERT INTO belongs_to VALUES ('" + editor_id + "','"+ article_id + "','"+ category + "')"
    return query            
}

exports.updateArticle = (body, modified_time, article_id, editor_id) => {
	let query = "UPDATE article SET body='" + body + "', modified_time='" + modified_time + "' WHERE article_id ='" + article_id +"' AND editor_id ='" + editor_id +"'"
    return query
}

exports.getAllCategoryNames = (type) => {
    let query = "SELECT name FROM category WHERE name='" + type +"'"
    return query
}

exports.getBelongingArticles = (type) => {
    let query = `SELECT article_id, editor_id ` +
    `FROM belongs_to `+
    `WHERE name = "${type}"` ;
    return query
}