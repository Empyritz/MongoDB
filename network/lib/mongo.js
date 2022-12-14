const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config/index')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = encodeURIComponent(config.dbName)

const MONGO_URI = `mongodb+srv:/${USER}:${PASSWORD}@${config.dbHost}:${config.port}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.dbName = DB_NAME
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if(err) {
            reject(err)
          }
          console.log('Connecte succesfuly to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    } 

    return MongoLib.connection
  }
}

module.exports = MongoLib