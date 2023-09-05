const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only files with the following extensions
  const allowedFileTypes = [".mp4", ".mov", ".avi", ".wmv", ".flv", ".mkv"] || [
    ".jpg",
    ".png",
  ];
  const ext = path.extname(file.originalname);
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    if (ext === ".jpg" || ext === ".png" || ext === ".jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Only images and videos are allowed!"), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5, // Limit the file size to 5MB
  // },
});

module.exports = { upload };
