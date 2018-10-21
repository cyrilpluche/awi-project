var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: process.env.USER_MAIL_SERVICE,
    auth: {
        user: process.env.USER_MAIL_ADDRESS,
        pass: process.env.USER_MAIL_PWD
    }
});

module.exports = {
    /*  before create a user
     *
     *  return: Void function that send an email to the given adress.
     */
    sendEmail(member, seed) {
        var validationLink = process.env.SERVER_URL + ':' + process.env.CLIENT_PORT + '/authentication/account-validation/' + seed

        var attachments = [
            {
                filename: 'logo.png',
                filePath: '../public/images/prello-logo.png',
                cid: 'unique@kreata.ee' //same cid value as in the html img src
            }
        ]

        var html =
            `<img style="width: 10%" src="cid:unique@kreata.ee"/><br>` +
            `<h3 style="color: blue">Ton compte est crée <b>${member.memberFirstname}</b>.</h3><br><br>` +
            `<p>Clique sur le lien ci-dessous pour activer ton compte et pouvoir te connecter à Prello.</p><br><br>` +
            `<h4><a href="${validationLink}">Valider mon compte</a></h4>`

        var mailOptions = {
            from: process.env.USER_MAIL_ADDRESS,
            to: member.memberEmail,
            subject: 'Activate your Prello account',
            html: html,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Failed to send email.');
                console.log(error);
            } else {
                console.log('Email sent.');
            }
        });
    }
}