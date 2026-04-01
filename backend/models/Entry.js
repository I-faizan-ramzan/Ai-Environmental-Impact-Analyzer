const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  userId: {
    type: String, // E.g., Web3 wallet address or simple string for now
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
});

module.exports = mongoose.model('Entry', EntrySchema);
