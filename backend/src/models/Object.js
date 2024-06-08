const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
}, { timestamps: true });

const Object = mongoose.model('Object', objectSchema);

module.exports = Object;
