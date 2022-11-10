const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', function(req, res){
  const filterUser = req.query.user  || null
  const filterChat = req.query.chat ||  null
  controller.getMessages(filterUser, filterChat)
    .then(messageList => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Unexpected error', 500, e)
    })
})

router.delete('/', function (req, res){
  if(req.query.error == 'ok') {
    response.error(req, res, 'Error message', 400)
  }
  res.send()
})

router.post('/', function (req, res){
  const {chat, user, message} = req.body
  controller.addMessage(chat, user, message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201)
    }).catch(e => {
      response.error(req, res, e, 400, 'Error en el controlador')
    })
})

router.patch('/:id', function (req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(error => response.error(req, res, 'Error interno', 500, error))
})

router.delete('/:id', function (req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
    })
    .catch(error => {
      response.error(req, res, 'Error interno', 500, error)
    })
})

module.exports = router