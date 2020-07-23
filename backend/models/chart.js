const mongoose = require('mongoose')
const chartSchema = new mongoose.Schema({
  userName: String,
  userId1: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  userId2: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  text: String,
})
  
  module.exports = mongoose.model('charts', chartSchema)

