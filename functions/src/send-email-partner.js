import * as functions from 'firebase-functions';
import md5 from 'md5';
import fetch from 'node-fetch';


const sendEmailPatner = functions.firestore.document('/potentialPartners/{id}')
  .onCreate((snapshot) => {

    const EmailSendConfi = functions.config().confemail;
    if (!EmailSendConfi) {
      console.log('Can\'t send email potentialPartners, EmailSend config is empty.');
    }

    const nodemailer = require('nodemailer');

    const usermail = functions.config().confemail.email;
    const passwordmail = functions.config().confemail.password;

    const mailTransport = nodemailer.createTransport({
        host: 'sys1.2mhosting.com.co',
        port: 465,
        secure: true,
        auth: {
            user: usermail,
            pass: passwordmail
        }
    });

    const potentialPartners = snapshot.data();

    const subscriberData = {
      email_address: potentialPartners.email,
      merge_fields: {
        CNAME: potentialPartners.companyName,
        FNAME: potentialPartners.fullName,
      },
    };

    const email = "";

    return sendEmailPotentialPatner(email, subscriberData);
  });

  function sendWelcomeEmail(email, displayName) {

    const mailOptions = {
        from: '"Nuevo patrocinador" <devfest@gdgcali.com>',
        to: email
    };

    mailOptions.subject = `Te damos la bienvenida a ${APP_NAME}!`;
    mailOptions.html = ``

    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    }).catch((error) => {
        console.log(error);
    });
}

export default mailchimpSubscribe;
