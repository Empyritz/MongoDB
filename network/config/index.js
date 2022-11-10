require('dotenv').config();
const uri = 'mongosh "mongodb+srv://cluster0.2vfutm7.mongodb.net/myFirstDatabase" --apiVersion 1 --username db_user_home'
const config = {
  port: process.env.PORT,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME
}

module.exports = {config}