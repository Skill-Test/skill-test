const nodemailer = require('nodemailer');
const i18n = require('i18n')

i18n.configure({
    locales: ['En', 'Mn'],
    directory: __dirname + '/locales',
    defaultLocale: 'En',
})


const isDev = process.env.NODE_ENV === 'development'

class EmailerService {
    static transport() {
        const transportOptions = {
            service: !isDev ? process.env.EMAIL_SERVICE : undefined,
            host: !isDev ? process.env.EMAIL_HOST : undefined,
            port: Number(process.env.EMAIL_PORT),
            //port: Number(process.env.EMAIL_PORT),
            auth: isDev ? {} : {
                //user: process.env.EMAIL_USER,
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD
            }
        }

        const transport = nodemailer.createTransport(transportOptions);

        return transport
    }

    static sendEmail(mailOptions) {
        console.log('wwww');
        EmailerService.transport().sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    static deliverEmail(dest, subject, body) {
        console.log('deliverEmail');
        var mailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: subject,
            text: body
        };

        EmailerService.transport().sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}

module.exports = EmailerService
