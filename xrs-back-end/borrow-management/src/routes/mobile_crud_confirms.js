const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verify_mobile_app');


router.post('/:id', verifyToken, async (req, res) => {

    let productsss = [];
    await Borrow.find({ 'person_id': req.params.id, 'i_will_pick': 'true', 'date_taken': null }, (err, products) => {
        if (products)
            products.map(product => productsss.push(product.product_id))
    })
    await Borrow.updateMany({ 'person_id': req.params.id, 'i_will_pick': 'true', 'date_taken': null }, { date_taken: Date.now(), i_will_pick: false }, (err, raw) => {
        if (err) {
            res.send(err)
        } else {
            res.send(productsss)
        }
    })
});



module.exports = router;

