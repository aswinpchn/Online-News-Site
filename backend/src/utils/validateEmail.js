// SJSU CMPE 226 Fall 2019 TEAM1

`use strict`

import SQLHelper from '../models/sqlDB/helper'
import SQLEditorQueries from '../models/sqlDB/editorQueries'
import SQLUserQueries from '../models/sqlDB/usersQueries'

var isUniqueEmail = (email) => {
    return new Promise( async(resolve) => {
        var query = SQLEditorQueries.doesEmailExistForUser(email)
        var result = await SQLHelper(query)
        if(result[0][0].TRUE) {
            resolve(false)
        }
        
        query = SQLUserQueries.doesEmailExistForEditor(email)
        var result = await SQLHelper(query)
        if(result[0][0].TRUE) {
            resolve(false)
        }
    
        resolve(true)

    })
}

module.exports = {
    isUniqueEmail: isUniqueEmail
}