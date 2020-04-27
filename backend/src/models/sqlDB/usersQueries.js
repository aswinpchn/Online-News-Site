exports.createUser = (name, DOB, location, sex, email, password) => {
    let query = "INSERT INTO user (name, DOB, location, sex, email, password) VALUES ('" + name + "', '" + DOB + "', '" + location + "', '" + sex + "', '" + email + "', '" + password + "')"
    return query
}

exports.loginUser = (email) => {
    let query = "SELECT user_id, name, password from user where email = '" + email + "'"
    return query
}

exports.loginEditor = (email) => {
    let query = "SELECT editor_id as user_id, name, password from editor where email = '" + email + "'"
    return query
}

exports.getUserDetails = (userId) => {
    let query = "SELECT email, name, sex, DOB, location from user where user_id = '" + userId + "'"
    return query
}

exports.getUserId = (email, userId) => {
    var query = "SELECT user_id from user where email = '" + email + "' and user_id != '" + userId + "'"
    return query
}

exports.getEditorId = (email) => {
    let query = "SELECT editor_id from editor where email = '" + email + "'"
    return query
}

exports.updateUserWithPassword = (email, password, name, sex, DOB, location, userId) => {
    let query = `UPDATE user SET email = "${email}", password = "${password}", name = "${name}", sex = "${sex}", DOB = "${DOB}", location = "${location}" WHERE user_id = ${userId}`
    return query
}

exports.updateUserWithoutPassword = (email, name, sex, DOB, location, userId) => {
    let query = `UPDATE user SET email = "${email}", name = "${name}", sex = "${sex}", DOB = "${DOB}", location = "${location}" WHERE user_id = ${userId}`
    return query
}

exports.getNotifications = (userId) => {
    let query = "( " +
        "SELECT NULL as name, A.editor_id as editor_id, A.article_id as article_id, A.headlines as headlines, A.create_time as time, 'NEW' as status " +
        "FROM article A JOIN ( " +
        "SELECT editor_id, article_id, name, s_time " +
        "FROM belongs_to NATURAL JOIN ( " +
        "SELECT name, s_time " +
        "FROM subscribed_to " +
        "WHERE user_id = " + userId +
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
        "WHERE user_id =" + userId +
        ") innerTable " +
        ") B ON A.editor_id = B.editor_id AND A.article_id = B.article_id AND A.modified_time > B.s_time " +
        ") " +
        "UNION" +
        " ( " +
        "SELECT name, editor_id, article_id, headlines, c_time as time, 'COMMENTS' as status " +
        "FROM comments NATURAL JOIN ( " +
        "SELECT min(c_time) AS mintime, editor_id, article_id " +
        "FROM comments " +
        "WHERE user_id = " + userId + " " +
        "GROUP BY editor_id, article_id " +
        ") A NATURAL JOIN article NATURAL JOIN user " +
        "WHERE user_id != " + userId + " AND mintime <= c_time " +
        ") " +
        "ORDER BY time desc";
    return query
}

exports.addLikes = (user_id, article_id, editor_id) => {
    let query = `INSERT INTO` +
        ` likes (user_id, article_id, editor_id, l_time)` +
        ` VALUES ( ${user_id} , ${article_id} , ${editor_id} , NOW() );`;
    return query;
}

exports.commentOnArticle = (user_id, article_id, editor_id, text) => {
    let query = `INSERT INTO` +
        ` comments (user_id, article_id, editor_id, text, c_time)` +
        ` VALUES ( ${user_id} , ${article_id} , ${editor_id} , '${text}' , NOW() );`;
    return query
}

exports.subscribeToACategory = (user_id, category_name) => {
    let query = `INSERT INTO` +
        ` subscribed_to (user_id, name, s_time)` +
        ` VALUES ( ${user_id} , '${category_name}' , NOW() );`;
    return query;
}

exports.getViews = (userId) => {
    let query = `SELECT A.article_id, A.editor_id, A.headlines content,  r_time time, 'viewed' as type` +
        ` FROM views V, article A` +
        ` WHERE V.user_id = ${userId} and V.article_id = A.article_id and V.editor_id = A.editor_id;`;
    return query;
}

exports.getLikes = (userId) => {
    let query = `SELECT A.article_id, A.editor_id, A.headlines content, l_time time, 'liked' as type ` +
        ` FROM likes L, article A` +
        ` WHERE L.user_id = ${userId} and L.article_id = A.article_id and L.editor_id = A.editor_id;`;
    return query;
}

exports.getSubscribes = (userId) => {
    let query = `SELECT null as article_id, null as editor_id, C.name content, s_time time, 'subscribed' as type ` +
        ` FROM subscribed_to S, category C` +
        ` WHERE S.user_id = ${userId} and S.name = C.name;`;
    return query;
}

exports.getSubscribedTo = (userId) => {
    let query = `SELECT name ` +
        ` FROM subscribed_to ` +
        ` WHERE user_id = ${userId};`;
    return query;
}