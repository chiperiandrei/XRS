const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//VALIDATE FIELDS
// TODO : validate fields
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hPassword
    });
    const existsEmail = await User.findOne({email: req.body.email});
    if (existsEmail) return res.status(400).send('Users exists');
    try {
        const usersave = await user.save();
        res.send({user: user._id});
    } catch (e) {
        res.status(400).send(e);
    }
});
router.post('/login', async (req, res) => {
    const existsEmail = await User.findOne({email: req.body.email});
    if (!existsEmail) return res.status(400).send("Email not exists");
    const comparePassoword = await bcrypt.compare(req.body.password, existsEmail.password);
    if (!comparePassoword) return res.status(400).send("Wrong password");
    //create token for login
    const token = jwt.sign({_id: existsEmail._id}, process.env.SECRET_JWT_TOKEN);
    const user = User.findOne({email:req.body.email},(req,user)=>{
        res.header('auth-token', token).send({
            isOperator: user.isOperator,
            name : user.name,
            email : user.email
        });
    })
    
    


});
module.exports = router;
