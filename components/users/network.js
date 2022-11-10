const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/', function(req, res) {
  controller.addUser(req.body.name)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected error', 500, error)
    })
})

router.get('/', function(req, res) {
  const filterUser = req.query.name || null
  controller.getUser(filterUser)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, 'Unexpected error', 500, error)
    })
})

module.exports = router