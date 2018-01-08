'use strict';
const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    	host: 'noora4.yourpersonalhost.com',
    	port: 465,
        secure: true, // true for 465, false for other ports / false for 567 
        auth: {
            user: 'info@projectsmiletrust.com', // generated ethereal user
            pass: 'psinfologin'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Project Smile 👻" <info@projectsmiletrust.com>', // sender address
        to: 'Mohammed Maaz, maazmmd@gmail.com', // list of receivers
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
