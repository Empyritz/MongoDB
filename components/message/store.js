const Model = require('./model')

function addMessage(message) {
  // list.push(message)
  const myMessage = new Model(message)
  console.log(myMessage)
  myMessage.save()
}

function getMessages(filterUser, filterChat) {
  return new Promise((resolve, reject) => {
    let filterObject = {}
  if(filterUser !== null) {
    filterObject = { user: filterUser }
  }else if(filterChat !== null){
    filterObject = { chat: filterChat }
  }

  Model.find(filterObject)
    .populate('user')
    .exec((error, populated) => {
      if(error) {
        reject(error)
        return false
      }
      resolve(populated)
    })
  })
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id
  })

  foundMessage.message = message
  const newMessage = await foundMessage.save()
  return newMessage
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id
  })
}

module.exports = {
  add: addMessage,
  list: getMessages,
  update: updateText,
  remove: removeMessage
}