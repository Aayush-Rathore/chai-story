import multer from "multer";

const imageHandler = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
}).single("thumbnail");

export default imageHandler;
