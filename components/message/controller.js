const store = require('./store')

function addMessage(chat, user, message) {
  return new Promise((resolve, reject) => {
    if(!chat || !user || !message) {
      console.log('[messageController] No hay mensaje')
      reject('Los datos son incorrectos')
      return false
    }
    const fullMessage = {
      chat,
      user,
      message,
      date: new Date()
    };
    resolve(fullMessage)
    store.add(fullMessage)
    // console.log(fullMessage)

  })
}

function getMessages(filterUser, filterChat) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser, filterChat))
  })
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if(!id || !message) {
      reject('Invalid data')
      return false
    }

    const result = await store.update(id, message)
    resolve(result)
  })
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject('Id invalid')
      return false
    }
    store.remove(id)
      .then(() => {
        resolve()
      })
      .catch(e => {
        reject(e)
      })
    // resolve(store.remove(id))
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}