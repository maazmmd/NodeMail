const camaro = require('camaro');
var HashMap = require('hashmap');
var path = require('path');
var process = require("process");
var ArrayList = require('arraylist');
var filename = require('file-name');
var sleep = require('thread-sleep');
var fs = require('fs');
var emailHelper = require("./emailHelper.js");

let xml = fs.readFileSync('/home/maazmmd/projects/Learn/myGitRepo/NodeMail/lib/ProjectSmile_MailSMSConfig.xml', "utf8");
//Print File as String --> console.log(xml);

const template = {
    smtpServer: '//smtpServer',
    port: '//port',
    isAuth: '//authentication',
    userName: '//userName',
    password: '//password',
    imageProcessingPath: '//emailBodyImagesPath',
    attachmentPath: '//attachmentPath',
    emailBodyTemplateFileName: '//emailBodyTemplateFileName',
    fromEmailAddress: '//fromEmailAddress',
    emailSubject: '//emailSubject',
    waitingPeriod: '//waitingPeriod',
    From: '//fromEmailAddress',
    Cc: '//CC'
};
//Prints all the config details as String --> console.log(camaro(xml, template));

let configDetails = camaro(xml, template);
// Get Config Details using variable.TagName --> console.log(configDetails.smtpServer);

// Loop through all the files in the temp directory
fs.readdirSync(configDetails.attachmentPath).forEach(function (file) {

        // Whatever you want to do after the wait
        let completeFileNameWithPath = path.join(configDetails.attachmentPath, file);
        if (fs.statSync(completeFileNameWithPath).isFile()) {
            let fileNameWithEmailSMS = filename(completeFileNameWithPath);
            if (completeFileNameWithPath.endsWith(".pdf")) {
                if (fileNameWithEmailSMS.split(";").length > 1) {
                    if (fileNameWithEmailSMS.split(";").length == 3) {
                        let mobileNumber = fileNameWithEmailSMS.split(";")[2];
                        //Call SMS API
                        System.out.println("SMS Sent sucessfully to Mobile Number : " + mobileNumber);
                    }
                    let toEmailID = fileNameWithEmailSMS.split(";")[1];
                    configDetails.To = toEmailID;

                    // Renaming File Name
                    let rename = fileNameWithEmailSMS.split(";")[0] + ".pdf";
                    //use the fs object's rename method to re-name the file
                    fs.rename(completeFileNameWithPath, path.join(configDetails.attachmentPath, rename), function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log('The file has been re-named to: ' + path.join(configDetails.attachmentPath, rename));
                    });

                    if (fs.existsSync(configDetails.attachmentPath + rename)) {
                        console.log("Falied to send Email to : " + toEmailID + " as Recepiant email dispatched with reference (fileName) : " + rename);
                        // throw new Exception("file exists");
                    }

                    // Setting Email Subject and appending with Receipt Number
                    configDetails.Subject = configDetails.emailSubject + fileNameWithEmailSMS.split(";")[0];

                    // Fetch e-Mail Body from Html Body Template
                    let HTMLStr = fs.readFileSync(path.join(configDetails.imageProcessingPath, configDetails.emailBodyTemplateFileName), "utf8");
                    configDetails.Body = HTMLStr;
                    let attachment = {filename: rename, path: configDetails.attachmentPath + `/` + rename};
                    let attachmentList = [];
                    attachmentList.push(attachment);
                    configDetails.AttachmentList = attachmentList;
                    console.log("Sending Email To : " + toEmailID + " Attached File : " + rename);
                    emailHelper.sendEmail(configDetails);
                    console.log("Email Send Successfully");

                    // Pause for seconds mentioned in Config.xml
                    sleep(parseInt(configDetails.waitingPeriod));
                } else {
                    // Enter in Status File (log) Email/SMS Sending failed
                }
                // Enter in Status File (log) Email/SMS successfully Send
            }
        }
});

