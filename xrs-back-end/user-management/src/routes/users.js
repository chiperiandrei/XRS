const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verify_mobile_app');
const jwt = require('jsonwebtoken');
router.get('/', verifyToken, async (req, res) => {
    User.find((err,doc)=>{
        const users = doc.map(user=>{
            return{
                firstName:user.firstname,
                lastName:user.lastname,
                email:user.email,
                avatarPath:user.avatarPath
            }
        })
        res.status(200).send(users)
    })
});

module.exports = router;
