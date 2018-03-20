'use strict';
const nodemailer = require('nodemailer');
var HashMap = require('hashmap');
var StringBuilder = require('stringbuilder');
StringBuilder.extend('string');
var process = require("process");

//Global Declarations
let attachmentList = [];

module.exports = {

    sendEmail: function (emailDetailsMap) {

        let smtpServer, port, authentication, imageProcessingPath, username, password, cc = '', bcc = '', emailText;

        smtpServer = emailDetailsMap.smtpServer;
        port = emailDetailsMap.port;
        authentication = emailDetailsMap.isAuth;
        imageProcessingPath = emailDetailsMap.imageProcessingPath;
        username = emailDetailsMap.userName;
        password = emailDetailsMap.password;

        //';' Sepearated String Value for Multiple recipients (To,Cc,Bcc)
        if(emailDetailsMap.Cc){
            cc = emailDetailsMap.Cc;
        }
        if(emailDetailsMap.Bcc){
            bcc = emailDetailsMap.Bcc;
        }
        if(emailDetailsMap.Text){
            emailText = emailDetailsMap.Text;
        }

        //attachmentPath = emailDetailsMap.get("AttachmentPath");
        attachmentList = emailDetailsMap.AttachmentList;

        let emailBody = processHTMLBody(emailDetailsMap);
        let emailSubject = convertToUnicode(emailDetailsMap.Subject);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: smtpServer,
            port: port,
            secure: authentication, // true for 465, false for other ports / false for 567
            auth: {
                user: username, // generated ethereal user
                pass: password  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: emailDetailsMap.From, // sender address
            to: emailDetailsMap.To, // list of receivers
            subject: emailSubject, // Subject line
            text: emailText, // plain text body
            html: emailBody, // html body
            cc: cc,
            bcc: bcc,
            attachments: attachmentList
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message sent: %s', info.messageId);
            //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}

var processHTMLBody = function (detailMap) {

    let cidCount = 0;
    let fileName;
    let imageSourceContendIdMap = new HashMap();
    let htmlBodyStr = detailMap.Body;
    const cheerio = require('cheerio');
    const $ = cheerio.load(htmlBodyStr);

    $('img').each(function (i, elem) {
        let imageSourceContent = $(this).attr('src');
        if (!imageSourceContent.includes("http")) {
            if (imageSourceContent.includes("base64")) {
                let srcContentArray = [];
                srcContentArray = imageSourceContent.split(",");
                let formatEncodingString = srcContentArray[0];
                //base64Data
                let imageString = srcContentArray[1];
                let imageFormat = formatEncodingString.split(";")[0];
                imageFormat = imageFormat.split("/")[1];

                let hrTime = process.hrtime();
                let currentMicroTime = hrTime[0] * 1000000 + hrTime[1] / 1000;
                currentMicroTime = currentMicroTime.toString().split(".")[0];
                fileName = "image" + currentMicroTime + "." + imageFormat;
                require("fs").writeFile(detailMap.imageProcessingPath + `/`+ fileName, imageString, 'base64', function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            } else {
                fileName = imageSourceContent;
            }
            cidCount++;
            $(this).attr('src', "cid:image" + cidCount);
            let embededAttachment = {filename: fileName, path: detailMap.imageProcessingPath + `/`+ fileName, cid: 'image' + cidCount};
            attachmentList.push(embededAttachment);
            imageSourceContendIdMap.set(imageSourceContent, $(this).attr('src'));
        }
    });
    if (imageSourceContendIdMap.size > 0) {
        imageSourceContendIdMap.forEach(function (value, key) {
            //console.log(key + " : " + value);
            //let imageSource = key;
            //let imageContentId = value;
            htmlBodyStr = htmlBodyStr.replace(key, value);
        });
    }
    return convertToUnicode(htmlBodyStr);
}

var convertToUnicode = function (htmlMessageBody) {
    let htmlUnicodeStr = '';
    for (let j = 0; j < htmlMessageBody.length; j++) {
        if (htmlMessageBody.charCodeAt(j) > 127) {
            htmlUnicodeStr += '&#' + htmlMessageBody.charCodeAt(j) + ';';
        } else {
            htmlUnicodeStr += htmlMessageBody.charAt(j);
        }
    }
    return htmlUnicodeStr;
}
