const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  cloudinaryUrl: { type: String, required: true },
  resourceType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
