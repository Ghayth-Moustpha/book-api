const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  country: String,
  city: String,
  address: String,
});
module.exports = mongoose.model('Author', authorSchema);
