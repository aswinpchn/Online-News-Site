// This query will store editor details in the database
exports.createEditor = (name, email, password) => {
    let query = "INSERT INTO editor (name, email, password) VALUES ('" + name + "', '" + email + "', '" + password + "')"
    return query
}

// This query will retreive editor details based on their ID
exports.getEditorProfile = (editorId) => {
    let query = "SELECT email, name FROM editor WHERE editor_id = '" + editorId + "'"
    return query
}


exports.getEditorIdByEmail = (email) => {
    let query = "SELECT user_id from user where email = '" + email + "'"
    return query
}

exports.checkDuplicateEmail = (email, editorId) => {
    let query = "SELECT editor_id from editor where email = '" + email + "' and editor_id != '" + editorId + "'"
    return query
}

exports.updateWithPassword = (email, name, editorId, password) => {
    let query = `UPDATE editor SET email = "${email}", password = "${password}", name = "${name}" WHERE editor_id = ${editorId}`
    return query
}

exports.updateWithoutPassword = (email, name, editorId) => {
    let query = `UPDATE editor SET email = "${email}", name = "${name}" WHERE editor_id = ${editorId}`
    return query
}