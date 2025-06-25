const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Sign-up
router.post('/signup', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const user = new User({ username, password, firstName, lastName });
    if (req.body.isAdmin) user.isAdmin = true;
    await user.save();
    res.json({ msg: 'User created' });
  } catch (err) {
    res.status(400).json({ msg: 'Error', error: err.message });
  }
});

// Log-in
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.compare(password)))
    return res.status(401).json({ msg: 'Wrong credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
