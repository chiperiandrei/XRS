const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verifyToken');

router.post('/', verifyToken, async (req, res) => {
    const product = new Borrow({
        name: req.body.name
    });
    try {
        const usersave = await product.save();
        res.status(200).send({ product: product._id });
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;
