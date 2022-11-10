const express = require('express')
const bodyParser = require('body-parser')
const { config } = require('./network/config/index')

const db = require('./db')
// const router = require('./components/message/network')
const router = require('./network/routes')
const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

db(uri)

var app = express();

app.use(bodyParser.json());
// app.use(router);
router(app)

app.use('/app', express.static('public'));

app.listen(3000) 
console.log('La aplicacion esta escuchando en http://localhost:3000')