const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verify_mobile_app');


router.get('/:id', verifyToken, async (req, res) => {
    let products = []
    Borrow.find({ person_id: req.params.id, 'date_given': null }, (err, doc) => {
        if (doc) {
            doc.map(product => products.push(product.product_id))
            res.send(products)
        }
        else {
            res.status(404).send("Borrows not found")
        }
    })

});


router.post('/', verifyToken, async (req, res) => {
    await Borrow.findOneAndUpdate({ 'product_id': req.body.product_id, 'person_id': req.body.person_id, 'returned': false, 'date_given': null }, { returned: true, date_given: Date.now() }, { new: true }, (err, doc) => {
        if (doc) {
            res.status(200).send("Success returned! ✔️")
        }
        res.status(403).send("Error during request")
    })

});



module.exports = router;

