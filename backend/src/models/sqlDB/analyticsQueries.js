import logger from '../../../config/logger';

// This query get the number of likes each article of a particular editor
// has got and return the TOP 10 values along with id of the article and headline
exports.mostLikedArticles = (editorId) => {
    let query = "" +
        "SELECT article_id, headlines, count(DISTINCT user_id) as likeCount " +
        "FROM article NATURAL JOIN likes " +
        "WHERE editor_id = " + editorId + " " +
        "GROUP BY article_id,headlines " +
        "ORDER BY likeCount DESC " +
        "LIMIT 10";

    logger.info('Executing Query ' + query);
    return query;
}

// This query will retrieve the number of times an article has been viewed by users grouped by their locations
exports.categoryReadByLocation = (category, editorId) => {
    let query = "" +
        "SELECT location, count(*) as viewCount " +
        "FROM belongs_to NATURAL JOIN article NATURAL JOIN views JOIN user ON views.user_id = user.user_id " +
        "WHERE belongs_to.name = '" + category + "' AND article.editor_id = " + editorId + " " +
        "GROUP BY location";

    logger.info('Executing Query ' + query);
    return query;
}

exports.getArticleReadsByAge = (editor_id, age_bracket) => {

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
    logger.info('Executing Query ' + query);
    return query;
}

exports.getArticleReadsByTimeOfTheDay = (editor_id, time_of_the_day) => {

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
    logger.info('Executing Query ' + query);
    return query;
}

// This query will retrieve the number of times each article has by a particular editor has been read
exports.getGraphValues = (editor_id) => {
    var query = "SELECT article_id,COUNT(user_id) as read_count FROM views WHERE editor_id = '" + editor_id + "' GROUP BY article_id";

    logger.info('Executing Query ' + query);
    return query;
}


// This query will retrieve details of the article which has been read the most number of times by any user in the system 
exports.getMostReadArticle = (editor_id) => {
    let query = "SELECT article_id,editor_id,body,headlines,create_time,modified_time " +
        "FROM article " +
        "WHERE editor_id = '" + editor_id + "' AND article_id IN ( " +
            "SELECT article_id " +
            "FROM views " +
            "WHERE editor_id = '" + editor_id + "' " +
            "GROUP BY article_id " +
            "HAVING COUNT(user_id) = (" +
                "SELECT MAX(no_of_reads) " +
                "FROM ( " +
                    "SELECT COUNT(user_id) as no_of_reads  " +
                    "FROM views " +
                    "WHERE editor_id= '" + editor_id + "' " +
                    "GROUP BY article_id" + 
                ") AS articles_read" +
            ")" +
        ");";

    logger.info('Executing Query ' + query);
    return query;
}

// This query will retreive the total of number of times every article of a particular editor in a category has been read 
exports.getMostReadCategory = (editor_id) => {
    var query = "SELECT category.name,COUNT(user_id) AS Read_Count " +
        "FROM category LEFT JOIN ( views NATURAL JOIN belongs_to) ON belongs_to.name = category.name AND views.editor_id ='" + editor_id + "'" +
        "GROUP BY category.name";

    logger.info('Executing Query ' + query);
    return query;
}