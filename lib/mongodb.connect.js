const mongoose = require('mongoose')

const connection = {}

const connectToMongo = async () => {
  if (connection.isConnected === 1) {
    return console.log('Already connected to Mongo!')
  }

  const db = await mongoose.connect('mongodb+srv://shrink-ly-user:Sxz7OgNmmz8YOUP9@cluster0.g4gbm.mongodb.net/shrink-ly?retryWrites=true&w=majority')

  connection.isConnected = db.connections[0].readyState
  console.log(`Connected to Mongo!: ${connection.isConnected}`)
}

module.exports = connectToMongo