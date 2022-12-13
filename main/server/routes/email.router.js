const express = require('express');
const router = express.Router();
const {SendMeetingCall,sendContactMail} = require('../middlewares/Mailer')

const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

router.post('/email/meeting', jsonParser, async (req,res) => {
    const {emaildata,uxair} = req.body;

    console.log("OWNER EMAIL: " + emaildata.owneremail)

    SendMeetingCall(
        emaildata.owneremail,
        emaildata.clientemail,  
        emaildata.clientname,
        emaildata.title,
        emaildata.purpose,
        emaildata.demand
        );

    res.send({status: 'ok'})
})

router.post('/email/contact', (req,res) => {
    const {fullname,email,subject,body} = req.body;
    try{
        sendContactMail(fullname, email, subject, body);
        console.log("CONTACT EMAIL SUCCESS")
        res.send({status: 'ok', message: 'Your message has been send to the developers'})
    }catch(e){
        console.log("ERROR WHILE SENDING MAIL TO DEV: " + e);
        res.send({status: 'error'})
    }
})

module.exports = router