const router = require('express').Router();
const verifyToken = require('./verifyToken');
const fs = require('fs');
router.post('/setup', (req, res) => {

    const appcfg = {
        "app-name": req.body.appname,
        "operator-fname": req.body.opfname,
        "operator-lname": req.body.oplname,
        "email": req.body.email,
        "password": req.body.password,
        "lauch-day": `${Date.now()}`
    };
    const data = JSON.stringify(appcfg);
    try {
        fs.writeFileSync('./settings.json', data)
    } catch (e) {
        res.status(400).send(e)
    }
    res.send({
        status: "Company has been set up."
    });
});
router.get('/setup', (req, res) => {
    const path = './settings.json';

    try {
        if (fs.existsSync(path)) {
            res.status(200).send({
                value: true,
                "company_name": "XRESTEANU",
                "created_by": "Andrei Chiperi"
            })
        } else
            res.status(404).send('File not exists!')
    } catch (err) {
        res.status(400).send(e)
    }
});

module.exports = router;
