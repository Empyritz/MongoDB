const express = require('express')
const app = express();
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const { connect, socket} = require('./socket')
const { config } = require('./network/config/index')
const db = require('./db')
const router = require('./network/routes')

const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
db(uri)

app.use(cors())
app.use(bodyParser.json());
connect(server)
socket.io.on('connection', (socket) => {
  console.log('conectado al socket')
  socket.emit('conected', 'Tas conectado')
})

router(app)
app.use('/', express.static('public'));
// app.use(express.static('public'));

server.listen(3000, () => {
  console.log('La aplicacion esta escuchando en http://localhost:3000')
}) 