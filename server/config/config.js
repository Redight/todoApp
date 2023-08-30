require('dotenv').config()
  
module.exports = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    dialect: 'postgres'
  }
