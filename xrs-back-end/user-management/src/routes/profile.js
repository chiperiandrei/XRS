const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
router.post('/default_avatar', verifyToken, async (req, res) => {
    const userdata = jwt.decode(req.header('auth-token'));
    const response = await User.findOneAndUpdate({ email: userdata.email }, { avatarPath: 'avatars/default.png' });
    const token = jwt.sign({
        email: response.email,
        isOperator: response.isOperator,
        firstname: response.firstname,
        lastname: response.lastname,
        photoPath: response.avatarPath
    }, process.env.SECRET_JWT_TOKEN);
    res.send({
        token: token
    })
});

module.exports = router;
