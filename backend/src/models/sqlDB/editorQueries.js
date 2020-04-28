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

// This stored prodecure checks if the email ID exists for an user
exports.doesEmailExistForUser = (email) => {
    let query = `CALL doesEmailExistForUser("${email}")`
    return query
}

// This stored prodecure checks if the email ID exists for an editor who has an editor Id other than the requestor
exports.checkDuplicateEmailForEditor = (email, editorId) => {
    let query = `CALL checkDuplicateEmailForEditor("${email}", ${editorId})`
    return query
}

// This stored prodecure updates the editor information which has been provided by the editor
exports.updateEditorInformation = (email, name, editorId, password) => {
    let query = `CALL updateEditorInformation("${email}", "${name}", ${editorId}, ${password})`
    if (password) {
        query = `CALL updateEditorInformation("${email}", "${name}", ${editorId}, "${password}")`
    }
    return query
}