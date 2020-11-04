const multer = require('multer');
const path = require('path');

function uploadPhoto(req, res, next) {
    const storage = multer.diskStorage({
        destination: '../public/uploads/',
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
        }
    });
    
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true)
            } else {
                cb(null, false);
                return cb(new Error('Allowed only jpg, png and jpeg'));
            }
        }
    })

    if (upload) {
        upload.single('photo');
        next()
    } else {
        next(new Error('Someting wrong cannot upload file'))
    }
}

module.exports = uploadPhoto;