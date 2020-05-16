const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        const dir = `./public/avatars/${id}`
        fs.exists(dir, exist => {
            if (!exist) {
                return fs.mkdir(dir, error => cb(error, dir))
            }
            return cb(null, dir)
        })
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(' ', '').replace('-', ' ')
        cb(null, fileName)
    }
});

var uploadImages = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.post('/default_avatar', verifyToken, async (req, res) => {
    const userdata = jwt.decode(req.header('auth-token'));
    const response = await User.findOneAndUpdate({ email: userdata.email }, { avatarPath: 'avatars/default.png' }, { new: true });
    const token = jwt.sign({
        email: response.email,
        isOperator: response.isOperator,
        firstname: response.firstname,
        lastname: response.lastname,
        photoPath: response.avatarPath
    }, process.env.SECRET_JWT_TOKEN);
    res.send({
        token: token
    })
});


router.post('/avatar/:id', verifyToken, uploadImages.single('avatar'), async (req, res) => {
    const userdata = jwt.decode(req.header('auth-token'));
    const response = await User.findOneAndUpdate({ email: userdata.email }, { avatarPath: 'avatars/' + req.params.id + '/' + req.file.filename }, { new: true });
    const token = jwt.sign({
        email: response.email,
        isOperator: response.isOperator,
        firstname: response.firstname,
        lastname: response.lastname,
        photoPath: response.avatarPath
    }, process.env.SECRET_JWT_TOKEN);
    res.send({
        token: token
    })
});


module.exports = router;
