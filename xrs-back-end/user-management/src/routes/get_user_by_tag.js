const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verify_mobile_app');
router.post('/:nfctag', verifyToken, async (req, res) => {
    const NFC = req.params.nfctag;
    const  user = await User.findOne({nfcToken:NFC})
    res.send({id:user._id})
});
module.exports = router;
