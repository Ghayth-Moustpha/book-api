const mongoose = require('mongoose');

const connect = (uri) => {
  mongoose.connect(uri)
    .then(() => console.log("MongoDB connected 👍"))
    .catch(err => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};

module.exports = { connect };
