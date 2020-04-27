exports.mostLikedArticles = (editorId) => {
    let query = "" +
    "SELECT article_id, headlines, count(DISTINCT user_id) as likeCount " +
    "FROM article NATURAL JOIN likes " +
    "WHERE editor_id = " + editorId + " " +
    "GROUP BY article_id,headlines " +
    "ORDER BY likeCount DESC " +
    "LIMIT 10";
    return query;
}

exports.categoryReadByLocation = (category, editorId) => {
    let query = "" +
    "SELECT location, count(*) as viewCount " +
    "FROM belongs_to NATURAL JOIN article NATURAL JOIN views JOIN user ON views.user_id = user.user_id " +
    "WHERE belongs_to.name = '" + category + "' AND article.editor_id = " + editorId + " " +
    "GROUP BY location";
    return query;
}

exports.getArticleReadsByAge = (editor_id, age_bracket) => {
    
    // let condition;
    // if(req.body.age_bracket == "0-18")
    // 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) < 18';
    // else if(req.body.age_bracket == "18-40")
    // 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40';
    // else if(req.body.age_bracket == "40-60")
    // 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60';
    // else
    // 	condition = '(YEAR(NOW()) - YEAR(U.DOB)) >= 60';
    // let query = `SELECT COUNT(*) count` +
    // 	` FROM views V, user U` +
    // 	` WHERE V.user_id = U.user_id AND V.editor_id = ${req.body.editor_id} AND ${condition};`;

    // DELIMITER $$;
    // CREATE PROCEDURE getArticleReadsByAge(IN editor_id INT, IN age_bracket varchar(20))
    // 	IF age_bracket = "0-18" THEN
    // 		SELECT COUNT(*) count
    // 		FROM views V, user U
    // 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) < 18;
    // 	ELSEIF age_bracket = "18-40" THEN
    // 		SELECT COUNT(*) count
    // 		FROM views V, user U
    // 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40;
    // 	ELSEIF age_bracket = "40-60" THEN
    // 		SELECT COUNT(*) count
    // 		FROM views V, user U
    // 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60;
    // 	ELSE
    // 		SELECT COUNT(*) count
    // 		FROM views V, user U
    // 		WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 60;
    // 	END IF;
    // END $$

    let query = `CALL getArticleReadsByAge(${editor_id}, "${age_bracket}");`;
    return query;
}

exports.getArticleReadsByTimeOfTheDay = (editor_id, time_of_the_day) => {
    
		// let condition;
		// if(req.body.time_of_the_day == "10PM-6AM")
		// 	condition = 'HOUR(r_time) >= 22 OR HOUR(r_time) < 6';
		// else if(req.body.time_of_the_day == "6AM-2PM")
		// 	condition = 'HOUR(r_time) >= 6 AND HOUR(r_time) < 14';
		// else
		// 	condition = 'HOUR(r_time) >= 14 AND HOUR(r_time) < 22';
		// let query = `SELECT COUNT(*) count` +
		// 	` FROM views` +
		// 	` WHERE editor_id = ${req.body.editor_id} AND ${condition};`;

		// DELIMITER $$;
		// CREATE PROCEDURE getArticleReadsByTimeOfTheDay(IN editor_id INT, IN time_of_the_day varchar(20))
		// 	IF time_of_the_day = "10PM-6AM" THEN
		// 		SELECT COUNT(*) count
		// 		FROM views
		// 		WHERE editor_id = editor_id AND HOUR(r_time) >= 22 OR HOUR(r_time) < 6;
		// 	ELSE 
		// 		IF time_of_the_day = "6AM-2PM" THEN
		// 			SELECT COUNT(*) count
		// 			FROM views
		// 			WHERE editor_id = editor_id AND HOUR(r_time) >= 6 OR HOUR(r_time) < 14;
		// 		ELSE
		// 			SELECT COUNT(*) count
		// 			FROM views
		// 			WHERE editor_id = editor_id AND HOUR(r_time) >= 14 OR HOUR(r_time) < 22;
		// 		END IF;
		// 	END IF;
		// END $$
        // DELIMITER; $$
		let query = `CALL getArticleReadsByTimeOfTheDay(${editor_id}, "${time_of_the_day}");`;
        return query;
}

exports.getGraphValues = (editor_id) => {
    var query = "SELECT article_id,COUNT(user_id) as read_count FROM views WHERE editor_id = '" + editor_id + "' GROUP BY article_id";
    return query;
}

exports.getMostReadArticle = (editor_id) => {
    let query = "SELECT article_id,editor_id,body,headlines,create_time,modified_time " +
    "FROM article " +
    "WHERE editor_id = '" + editor_id + "' AND article_id IN ( " +
    "SELECT article_id " +
    "FROM views " +
    "WHERE editor_id = '" + editor_id + "' " +
    "GROUP BY article_id " +
    "HAVING COUNT(user_id) = " +
    "(SELECT MAX(no_of_reads) " +
    "FROM ( " +
    "SELECT COUNT(user_id) as no_of_reads  " +
    "FROM views " +
    "WHERE editor_id= '" + editor_id + "' " +
    "GROUP BY article_id) AS articles_read)" +
    ");";
    return query;
}

exports.getMostReadCategory = (editor_id) => {
    var query = "SELECT category.name,COUNT(user_id) AS Read_Count " +
    "FROM category LEFT JOIN ( views NATURAL JOIN belongs_to) ON belongs_to.name = category.name AND views.editor_id ='" + editor_id + "'" +
    "GROUP BY category.name";
    return query;
}