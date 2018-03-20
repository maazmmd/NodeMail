# Node Email Engine
******************************************************************************************************************

Core File : emailHelper.js  
Clone the Repo  
Enter the SMTP details and from and to addresses in Config XML  
```
$$ git clone https://github.com/maazmmd/NodeMail
$$ npm install
$$ node emailClient.js
```
******************************************************************************************************************
Node JS API for sending Email with attachment as Receipt 

SEND EMAIL WITH ATTACHMENT - How to Send (Read Steps Below/ Simple 5 steps if are not a developer as well - No need to know any coding skills 

#### STEP 1  
Extract the .zip in D:/ Drive (If path is changes then u should change in EmailClient.js)  
#### STEP 2  
Connect to Internet (Good if no firewall settings are enabled)  
#### STEP 3  
Download NodeJS and Install  
#### STEP 4  
Place all the Receipts inside D:/projectSmileAPI/encryptedPDF Folder and remember  
FileName should be of the form - ReceiptNo;emailAddress@host.com;MobileNumber OR ReceiptNo;emailAddress@host.com  
Example : MOJO1234567890;maazmmd@gmail.com.pdf OR MOJO1234567890;maazmmd@gmail.com;9449115598.pdf  
#### STEP 5  
Doble Click on run.bat File  
***********************************************************************************************************************


Below Documentation is for Developer/Person Configuring/ structure changes - if any configuration changes  
## Usage & Requirements  

### Requirements
#### Machine showed to connected to Internet(Good if no firewall settings are enabled).   
#### Node JS Should be installed in Machine  
    
### Usage 
Extract zip File in D:\ drive.   
After extraction of .zip file.  
Go through MailConfig.xml and enter SMTP Details and other necessary details.  
Run the bat File present in root Folder.  

## Status.txt File is the log file, prints success and failure  @ToDo

### Measures to take care  
#### FileName convention of Attahment  
   MOJO123456;emailid@abcd.com.pdf  
#### Folder Structure  
├── projectSmileAPI  
│   ├── encryptedPDF  
│   │   └── imageProcessing(Folder) - Images and Email Body Template goes here  
│   │   └── All PDF files are placed here  
│   └── ProjectSmile_MailConfig.xml  
│   └── projectSmileEmail.jar - User need not know about this file  
│   └── lib(Folder) - User need not know about this file 
└  

#### If folder is not extracted in D:\ drive then path should be changed in Node Program
#### Bat file cannot be run in Mac and Unix OS.  
#### If Mac and Unix is being used then u should run from Terminal

*****************************************************************************************************************
If any doubts Kindly contact Mohammed Maaz  
Reachable at +91-9449115598, e-Mail : maazmmd@gmail.com  
