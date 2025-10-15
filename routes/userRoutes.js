const express = require("express");

const {
  signupUser,
  loginUser,
} = require("../controllers/userController");
const { uploadFile, getFiles } = require("../controllers/fileController");
const { upload } = require("../middlewares/multer");


const router = express.Router();

// User Signup route
router.post("/signup", signupUser);

// User Login route
router.post("/login", loginUser);

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getFiles);





module.exports = router;
