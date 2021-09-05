const mysql = require('mysql2/promise')
require('dotenv').config()

module.exports = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true
})