const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL, NO_REPLY_PASSWORD } = require('../config/config');
const emailTemplates = require('../email-templates');
const CustomError = require("../error/CustomError");

const sendEmail = async (receiverMail, emailActions, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailActions];

    if (!templateInfo) {
        throw new CustomError('Wrong template', 500)
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, { frontendURL: 'google.com' });

   const html = await templateRenderer.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'No reply',
        to: receiverMail,
        subject: templateInfo.subject,
        html //html: html
    });

};

module.exports = {
    sendEmail
};