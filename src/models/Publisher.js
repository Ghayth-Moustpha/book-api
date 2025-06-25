const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
  name: String,
  city: String,
});
module.exports = mongoose.model('Publisher', publisherSchema);
