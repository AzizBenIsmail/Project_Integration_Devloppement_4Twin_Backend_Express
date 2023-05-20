const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'public/resumes')
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);

  }
})

var upload = multer({ storage: storage, 
  limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = upload;
