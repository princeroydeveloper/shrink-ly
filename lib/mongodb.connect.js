const mongoose = require('mongoose')

const connection = {}

const connectToMongo = async () => {
  if (connection.isConnected === 1) {
    return console.log('Already connected to Mongo!')
  }

  const db = await mongoose.connect(process.env.MONGO_URI)

  connection.isConnected = db.connections[0].readyState
  console.log(`Connected to Mongo!: ${connection.isConnected}`)
}

module.exports = connectToMongo