'use strict';
const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    	host: 'hostname',
    	port: 465,
        secure: true, // true for 465, false for other ports / false for 567 
        auth: {
            user: 'username', // generated ethereal user
            pass: 'password'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"From 👻" <from@host.com>', // sender address
        to: '"To 👻" <to@host.com>', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world Test Email from Node JS?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    	if (error) {
    		return console.log(error);
    	}
    	console.log('Message sent: %s', info.messageId);
    	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
