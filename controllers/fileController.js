const File = require("../models/fileSchema");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const result = await uploadOnCloudinary(file.path);

    if (!result || !result.secure_url) {
      return res.status(500).json({ msg: "Cloudinary upload failed" });
    }

    // Save file info to MongoDB
    const savedFile = await File.create({
      originalName: file.originalname,
      cloudinaryUrl: result.secure_url,
      resourceType: result.resource_type,
    });

    res.status(200).json({
      msg: "File uploaded and saved to DB",
      file: savedFile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ msg: "Upload failed", error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ msg: "Failed to fetch files" });
  }
};

module.exports = { uploadFile, getFiles };
