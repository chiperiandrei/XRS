const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.gusername,
        pass: process.env.gpassword
    }
});




//VALIDATE FIELDS
// TODO : validate fields
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hPassword,
        nfcToken: req.body.nfcToken
    });
    const existsEmail = await User.findOne({ email: req.body.email });
    if (existsEmail) return res.status(400).send('Users exists');
    const existsNFCTAG = await User.findOne({ nfcToken: req.body.nfcToken });
    if (existsNFCTAG) return res.status(400).send('NFC TAG has been taken');
    try {
        const usersave = await user.save();
        const mailOptions = {
            from: 'xrs.licenta@gmail.com',
            to: req.body.email,
            subject: '[Register form] X Reserve System',
            text : `Hello, ${req.body.firstname} ${req.body.lastname}!
                    Welcome to our application. 
                    Your access card key is ${req.body.nfcToken}.
                    `
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        
        res.status(200).send({ user: user._id });
    } catch (e) {
        res.status(400).send(e);
    }
});
router.post('/login', async (req, res) => {
    const existsEmail = await User.findOne({ email: req.body.email });
    if (!existsEmail) return res.status(400).send("Email not exists");
    const comparePassoword = await bcrypt.compare(req.body.password, existsEmail.password);
    if (!comparePassoword) return res.status(400).send("Wrong password");
    
    //create token for login and sign it with secret key
    const token = jwt.sign({
        id: existsEmail._id,
        email: existsEmail.email,
        isOperator: existsEmail.isOperator,
        firstname: existsEmail.firstname,
        lastname: existsEmail.lastname,
        photoPath: existsEmail.avatarPath
    }, process.env.SECRET_JWT_TOKEN);
    const user = User.findOne({ email: req.body.email }, (req, user) => {
        res.header('auth-token', token).send({
            token: token
        });
    })
});

router.post('/loginOperator', async (req, res) => {
    const existsEmail = await User.findOne({ email: req.body.email });
    if (!existsEmail) return res.status(400).send("Email not exists");
    const comparePassoword = await bcrypt.compare(req.body.password, existsEmail.password);
    if (!comparePassoword) return res.status(400).send("Wrong password");
    if (existsEmail.isOperator !== true) {
        return res.status(400).send("You re not operator");
    }
    //create token for login
    //create token for login
    const userInfo = {
        email: existsEmail.email,
        firstname: existsEmail.firstname,
        lastname: existsEmail.lastname,
        photoPath: existsEmail.avatarPath
    };
    const user = User.findOne({ email: req.body.email }, (req, user) => {
        res.send(userInfo);
    })
});
module.exports = router;
