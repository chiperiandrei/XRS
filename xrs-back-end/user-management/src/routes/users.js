const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verify_mobile_app');
const verifyTokenJWT = require('./verifyToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/', verifyToken, async (req, res) => {
    User.find((err, doc) => {
        const users = doc.map(user => {
            return {
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                avatarPath: user.avatarPath
            }
        })
        res.status(200).send(users)
    })
});
router.post('/:id', verifyTokenJWT, async (req, res) => {
    let hPassword = null;
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        hPassword = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.email) {
        const existsEmail = await User.findOne({ email: req.body.email });
        if (existsEmail) return res.status(400).send('Email exists');
    }

    const oldAccount = await User.findOne({ _id: req.params.id });
    const updates = {
        firstname: req.body.firstname === undefined ? oldAccount.firstname : req.body.firstname,
        lastname: req.body.lastname === undefined ? oldAccount.lastname : req.body.lastname,
        email: req.body.email === undefined ? oldAccount.email : req.body.email,
        password: hPassword || oldAccount.password
    };

    const usersave = await User.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
    if (usersave) {
        //create token for login
        const token = jwt.sign({
            id: usersave._id,
            email: usersave.email,
            isOperator: usersave.isOperator,
            firstname: usersave.firstname,
            lastname: usersave.lastname,
            photoPath: usersave.avatarPath
        }, process.env.SECRET_JWT_TOKEN);
        res.status(200).send({ message: 'Account updated ✔️', token: token });
    }
    else {
        res.send('Something went wrong ❌')
    }


});


module.exports = router;
