const store = require('./store');

function addUser(name) {
  if(!name) {
    return Promise.reject('There is no name')
  }
  const user = {
    name
  }
  return store.add(user)
}

function getUser(name) {
  return store.get(name);
}


module.exports = {
  addUser,
  getUser
}