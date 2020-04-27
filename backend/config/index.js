// SJSU CMPE 226 Fall 2019 TEAM1

`use strict`

let common = require('./env/common')

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`)

module.exports = Object.assign({}, common, config)
