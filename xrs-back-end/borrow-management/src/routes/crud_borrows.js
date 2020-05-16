const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verifyToken');

router.post('/', verifyToken, async (req, res) => {
    console.log(req.body)
    const product = new Borrow({
        product_id: req.body.product_id,
        person_id: req.body.person_id,
        end: req.body.end,
        status_at_borrow: req.body.status_at_borrow
    });
    try {
        const usersave = await product.save();
        res.status(200).send({ product: product._id });
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/', verifyToken, async (req, res) => {
    Borrow.find({}, (err, documents) => {
        if (err)
            res.status(404).send(err)
        else {
            const to_send = documents.map(document => {
                return {
                    owner: document.person_id,
                    product: document.product_id,
                    end: document.end
                }
            })
            res.send(to_send)
        }
    })
});
router.get('/:id', verifyToken, async (req, res) => {
    Borrow.find({ person_id: req.params.id, returned: false }, (err, documents) => {
        if (err)
            res.status(404).send(err)
        else {
            const to_send = documents.map(document => {
                return {
                    owner: document.person_id,
                    product: document.product_id,
                    end: document.end
                }
            })
            res.send(to_send)
        }
    })
});



module.exports = router;

