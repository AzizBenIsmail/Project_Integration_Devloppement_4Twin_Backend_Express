const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
     console.log('file',file);
//     const {username}=file.originalname;
// console.log('file uploade',file.);
//     cb(null, username + '.png')
    cb(null, file.originalname)

  }
})

var upload = multer({ storage: storage });
module.exports = upload;