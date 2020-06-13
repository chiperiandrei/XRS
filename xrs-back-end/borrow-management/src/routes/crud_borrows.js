const router = require('express').Router();
const Borrow = require('../models/Borrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verifyToken = require('./verifyToken');

router.post('/', verifyToken, async (req, res) => {
    console.log(req.body)
    const existBorrow = await Borrow.findOne({ product_id: req.body.product_id, 'returned': false });
    if (existBorrow) return res.status(400).send('Product has been reserved');
    const borrow = new Borrow({
        product_id: req.body.product_id,
        person_id: req.body.person_id,
        end: req.body.end,
        date_borrowed: req.body.start

    });
    try {
        const borrowsave = await borrow.save();
        res.status(200).send({ borrowsave: borrowsave._id });
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/', verifyToken, async (req, res) => {
    Borrow.find({ 'returned': false }, (err, documents) => {
        if (err)
            res.status(404).send(err)
        else {
            const to_send = documents.map(document => {
                return {
                    owner: document.person_id,
                    product: document.product_id,
                    end: document.end,
                    date_picked: document.date_selected_pick !== null ? document.date_selected_pick : null,
                    date_taken: document.date_taken
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
                    end: document.end,
                    date_picked: document.date_selected_pick !== null ? document.date_selected_pick : null,
                    date_taken: document.date_taken
                }
            })
            res.send(to_send)
        }
    })
});
router.post('/pick/:id', verifyToken, async (req, res) => {
    try {
        await Borrow.findOneAndUpdate({ product_id: req.params.id, 'returned': false, 'date_taken': null }, { i_will_pick: true, date_selected_pick: Date.now() }, { new: true }, (err, doc) => {
            if (doc) {
                return res.send("Product updated ✔️")
            }
            res.status(404).send("error during update")


        })
    } catch (error) {
        res.error(error)
    }


});



module.exports = router;

