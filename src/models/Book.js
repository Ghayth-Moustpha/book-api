const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  type: String,
  price: Number,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
});
module.exports = mongoose.model('Book', bookSchema);
