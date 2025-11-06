const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    },
    destination:function(req,file,callback){
        callback(null,'uploads/');
    }

});

const upload = multer({storage });

module.exports = upload;
