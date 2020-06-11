const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.gusername,
        pass: process.env.gpassword
    }
});




router.post('/', async (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: 'xrs.licenta@gmail.com',
        subject: '[Contact form] XRS',
        text: `${req.body.firstname} ${req.body.lastname} said : 
                ${req.body.message}
                
                Respond to ${req.body.email}`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            res.status(403).send(err)
        else
            res.send(info)
    });
});
module.exports = router;
