const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  supplierInfo: {
    type: String,
    default: "",
  },
  footprintScore: {
    type: Number,
    required: true,
  },
  analysisDetails: {
    type: mongoose.Schema.Types.Mixed, // flexible object for storing mock/AI outputs
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isHiddenForUser: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Entry', EntrySchema);
