const db = require('mongoose')


async function connect(url) {
  await db.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  })
  console.log('connected')
  // .then(() => console.log('connected'))
  // .catch(err => {
  //   console.log('errrorrrrrr')
  //   console.error(err)
  // })
}

module.exports = connect


