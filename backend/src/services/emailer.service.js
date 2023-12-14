const nodemailer = require('nodemailer');
const i18n = require('i18n')
i18n.configure({
    locales: ['En', 'Mn'],
    directory: __dirname + '/locales',
    defaultLocale: 'En',
})

module.exports = {
    deliverEmail: function (dest, subject, body) {
        var transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PASS
            }
        });

        var mailOptions = {
            from: process.env.SMTP_SENDER_EMAIL_ADDRESS,
            to: dest,
            subject: subject,
            text: body
        };

        function sendEmail() {
            return new Promise((resolve, reject) => {
                let messageId = null
                transport.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        reject(error)
                    } else {
                        console.log('Email sent: ' + info.response)
                        messageId = info.messageId
                        resolveContent(messageId)
                    }
                })
            })
        }

        sendEmail().then(messageId => {
            return messageId
        }).catch(error => {
            return null
        })
    }
}