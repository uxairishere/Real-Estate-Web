const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const SendMeetingCall = (owneremail, clientemail, clientname, title, purpose, demand) => {
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.SMTP_ADDRESS,
        pass: process.env.SMTP_APP_PASS
    }
  }));
  let sender = "BECH DO -Real Estate"
  var mailOptions = {
    from: sender,
    to: owneremail,
    subject: 'INVITATION FOR CALL',
    text: 'That was easy!',
    attachments: [{
        filename: 'Logo.png',
        path: 'http://localhost:3001/logo.png',
        cid: 'logo' 
   }],
    html: `<img src="cid:logo" width="200" />
    <p>Hi there, I am ${clientname}, I am very intersted in the post 
    <b>${title}</b> for <b>${purpose}</b> having <b>$Rs. ${demand}</b> demand
    you uploaded on BACH DO.
    <br/> Here is my my email is ${clientemail}.Please call me when you are avaiable!.
    <br/>
    </p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  

}

const sendContactMail = (fullname, email, subject, body) => {
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SMTP_ADDRESS,
      pass: process.env.SMTP_APP_PASS
    }
  }));

  var mailOptions = {
    from: fullname,
    to: email,
    subject: subject,
    text: 'That was easy!',
    html: body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}


module.exports = {SendMeetingCall, sendContactMail}