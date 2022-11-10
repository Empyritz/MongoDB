const Model = require('./model')

function addUser(user){
   const myUser = new Model(user)
   return myUser.save()
}

function getUser(name){
  let filter = {}
  if(name !== null) {
    filter = { name: name }
  }
  return Model.find(filter)
}

module.exports = {
  add: addUser,
  get: getUser
}