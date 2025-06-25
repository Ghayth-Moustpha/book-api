const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = {};
auth.verifyToken = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ msg: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    if (!user) throw Error();
    req.user = user;
    next();
  } catch {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
auth.verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: 'Admin only' });
  next();
};
module.exports = auth;
