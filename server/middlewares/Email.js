var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: process.env.USER_MAIL_SERVICE,
    auth: {
        user: process.env.USER_MAIL_ADDRESS,
        pass: process.env.USER_MAIL_PWD
    }
});

var smtpTransport = nodemailer.createTransport({
    service: process.env.USER_MAIL_SERVICE,
    auth: {
        user: process.env.USER_MAIL_ADDRESS,
        pass: process.env.USER_MAIL_PWD,
        XOAuth2: {
            clientId: process.env.MAIL_ID_CLIENT,
            clientSecret: process.env.MAIL_SECRET,
            refreshToken: process.env.MAIL_TOKEN
        }
    }
});

module.exports = {
    /*  before create a user
     *
     *  return: Void function that send an email to the given adress.
     */
    sendEmail(req, res, next) {
        var validationLink = process.env.SERVER_URL + ':' + process.env.CLIENT_PORT + '/account-confirmation/' + req.body.result.memberToken

        var attachments = [
            {
                filename: 'prello-logo.png',
                path: 'server/public/images/prello-logo.png',
                cid: 'maillogo' //same cid value as in the html img src
            }
        ]

        var html =
            `<div style="margin: auto; text-align: center;">` +
            `<img style="width: 20%" src="cid:maillogo"/><br>` +
            `<h3 style="color: blue">Ton compte est crée <b>${req.body.result.memberFirstname}</b>.</h3><br><br>` +
            `<p>Clique sur le lien ci-dessous pour activer ton compte et pouvoir te connecter à Prello.</p><br>` +
            `<h4><a href="${validationLink}">Valider mon compte</a></h4>` +
            `<div>`

        var mailOptions = {
            from: process.env.USER_MAIL_ADDRESS,
            to: req.body.result.memberEmail,
            subject: 'Activate your Prello account',
            html: html,
            attachments: attachments
        };

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(400).send('Failed to send email.');
            } else {
                console.log('Email sent.')
                next()
            }
        });
    },

    /*  before create a user
     *
     *  return: Void function that send an email to the given adress.
     */
    sendNewPassword(req, res, next) {
        var attachments = [
            {
                filename: 'prello-logo.png',
                path: 'server/public/images/prello-logo.png',
                cid: 'maillogo' //same cid value as in the html img src
            }
        ]

        var html =
            `<div style="margin: auto; text-align: center;">` +
            `<img style="width: 20%" src="cid:maillogo"/><br>` +
            `<h3 style="color: blue">New password for your Prello account.</h3><br><br>` +
            `<p>Here is your new password for your account. We recommend you to change it as soon as possible with a custom password in your profile section.</p><br>` +
            `<p>${req.body.memberPassword}</p><br><br>` +
            `<p style="color: #ff7000">If you're not a member of this application, please ignore this email.</p><br>` +
            `<div>`

        var mailOptions = {
            from: process.env.USER_MAIL_ADDRESS,
            to: req.body.memberEmail,
            subject: 'Prello new password',
            html: html,
            attachments: attachments
        };

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.status(400).send('Failed to send email.');
            } else {
                console.log('Email sent.')
                next()
            }
            smtpTransport.close();
        });
    }
}