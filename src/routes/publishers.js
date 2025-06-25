const express = require('express');
const Publisher = require('../models/Publisher');
const Book = require('../models/Book');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// ✅ Add publisher
router.post('/', verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const pub = new Publisher(req.body);
    await pub.save();
    res.json(pub);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
const q = req.query.q ?? ''; // use empty string if q is undefined or null
  const pubs = await Publisher.find() ; 
if (q=='') {
        res.json(pubs);
}else 
  try {
    const pubs = await Publisher.find({
      name: { $regex: String(q), $options: 'i' } // ensure q is string
    });
    res.json(pubs);
  } catch (err) {
    next(err);
  }

});


// ✅ Get publisher + books
router.get('/:id/books', async (req, res, next) => {
  try {
    const pub = await Publisher.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Not found' });

    const books = await Book.find({ publisher: pub._id })
      .populate('publisher')
      .populate('author');

    res.json({ publisher: pub, books });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
