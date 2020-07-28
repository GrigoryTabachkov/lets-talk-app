const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  lat: String,
  lng: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = mongoose.model('locations', locationSchema);
