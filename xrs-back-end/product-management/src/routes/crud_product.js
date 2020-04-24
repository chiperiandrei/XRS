const router = require('express').Router();
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const product = new Product({
        name: req.body.name
    });
    try {
        const usersave = await product.save();
        res.status(200).send({ product: product._id });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        Product.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) {
                res.status(405).send(err)
            }
            res.status(200).send({ message: 'Deleted' })

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
            res.status(200).send({ modified: true })
        });
    } catch (error) {
        res.send(error)
    }

});


module.exports = router;
