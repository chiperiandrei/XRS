const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verify_mobile_app');


router.post('/:id', verifyToken, async (req, res) => {
    const doc = await Borrow.updateMany({ person_id: req.params.id, returned: false, date_given: null }, { returned: true, date_given: Date.now() }, (err, raw) => {
        if (err)
            res.status(404).send("Not found products")
        else {
            res.send("All products returned.")
        }
    })
});



module.exports = router;

