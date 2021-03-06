const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verify_mobile_app');
router.post('/:email', verifyToken, async (req, res) => {
    const NFC = req.body.tag;
    const email = req.params.email;
    const response = await User.findOneAndUpdate({ email: email }, { nfcToken: NFC }, { new: true })
    if (response === null) {
        res.status(401).send("user not found")
    }
    else {
        res.status(200).send("Tag added! ✔️");
    }
});

router.get('/:nfctag', async (req, res) => {
    const existsToken = await User.findOne({ nfcToken: req.params.nfctag });
    if (existsToken) return res.status(400).send('Not avalaible exists');
    res.send(true)
});

module.exports = router;
