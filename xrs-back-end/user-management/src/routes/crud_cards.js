const router = require('express').Router();
const Card = require('../models/AccessCard');
const verifyToken = require('./verifyToken');
const verifyMobile = require('./verify_mobile_app');
router.post('/', verifyMobile, async (req, res) => {
    const NFC = req.body.tagid;
    const card = new Card({
        NFCID: NFC
    });
    const tagExists = await Card.findOne({ NFCID: NFC });
    if (tagExists) return res.status(400).send('Card exists');
    try {
        const cardsave = await card.save();
        res.status(200).send(`Tag added! ✔️`);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/', verifyToken, async (req, res) => {
    const NFC = req.body.tagid;
    Card.deleteOne({ NFCID: NFC }, (err) => res.send(err))
    res.send(`Tag deleted! 👍`)
});

router.get('/:tagid', async (req, res) => {
    const NFC = req.params.tagid;
    const card = await Card.findOne({ NFCID: NFC })
    if (card)
        res.send(true)
    else {
        res.status(404).send(false)
    }
});



module.exports = router;
