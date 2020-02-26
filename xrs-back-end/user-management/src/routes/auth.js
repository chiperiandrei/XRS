const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const usersave = await user.save();
        res.send(usersave);
    } catch (e) {
        res.status(400).send(e);
    }
});
router.get('/',(req,res)=>{
    res.send('sal')
});

module.exports = router;
