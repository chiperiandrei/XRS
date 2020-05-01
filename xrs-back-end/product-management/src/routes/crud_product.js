const router = require('express').Router();
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
let multer = require("multer")

const DIR = './public/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, '-' + fileName)
    }
});

var upload = multer({
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

router.post('/upload', verifyToken, upload.array('imgCollection'), (req, res) => {
    console.log(req.params)
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    res.send(true)

});

router.post('/', verifyToken, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        specs: req.body.specs,
        category: req.body.category
    });
    try {
        product.imagesPath = product.imagesPath + product.id + '/'
        const usersave = await product.save();
        res.status(200).send({ product: product._id });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', verifyToken, async (req, res) => {
    Product.find((err, doc) => {
        if (err) {
            res.status(404).send(err)
        }
        res.send(doc)
    })
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) {
                res.status(405).send(err)
            }
            res.status(200).send({ message: 'Deleted ❌' })

        })
    } catch (e) {
        res.send(400).send(e.message)

    }
});
router.get('/:id', verifyToken, async (req, res) => {
    try {
        Product.findById(req.params.id, (err, doc) => {
            if (err) {
                res.status(405).send(err)
            }
            res.status(200).send(doc)

        })
    } catch (e) {
        res.send(400).send(e.message)

    }
});
router.put('/:id', verifyToken, async (req, res) => {
    const id = { _id: req.params.id };
    const update = req.body;
    try {
        await Product.findOne(id, (errorfind, response) => {
            if (errorfind) {
                res.status(404).send(errorfind)
            }
        });
        await Product.updateOne(id, update, (error, raw) => {
            if (error) {
                res.status(404).send(error)
            }
            res.status(200).send({ message: 'Product updated ✔️' })
        });
    } catch (error) {
        res.send(error)
    }

});


module.exports = router;
