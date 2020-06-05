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
                joined: user.joined,
                avatar: user.avatarPath,
                nfc_tag: user.nfcToken
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
router.get('/', verifyTokenJWT, async (req, res) => {
    await User.find((err, users) => {
        const users_accounts = users.map(user => {
            return {
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                joined: user.joined,
                isOperator: user.isOperator,
                avatar: user.avatarPath,
                nfc_tag: user.nfcToken
            }
        })
        if (err)
            res.send(err)
        res.send(users_accounts)
    })
})


router.post('/addoperator/:nfctag', verifyTokenJWT, async (req, res) => {
    try {
        const nou = await User.findOneAndUpdate({ nfcToken: req.params.nfctag }, { isOperator: true }, { new: true })
        if (nou) {
            res.status(200).send({ message: "Updated" })
        }
        res.statuus(404).send({ eroare: "eroare" })
    } catch (error) {
        res.status(401).send(error)
    }

})

router.post('/removeoperator/:nfctag', verifyTokenJWT, async (req, res) => {
    try {
        const nou = await User.findOneAndUpdate({ nfcToken: req.params.nfctag }, { isOperator: false }, { new: true })
        if (nou) {
            res.status(200).send({ message: "Updated" })
        }
        res.statuus(404).send({ eroare: "eroare" })
    } catch (error) {
        res.status(401).send(error)
    }

})

module.exports = router;
