const {WELCOME, FORGOT_PASS, RETURN} = require("../enums/email-actions.enum");

module.exports = {
    [WELCOME]: {
        subject: 'Welcome on board',
        templateName: 'welcome'
    },

    [FORGOT_PASS]: {
        subject: 'Your password is under protect',
        templateName: 'forgot-pass'
    },

    [RETURN]: {
        subject: 'We miss you',
        templateName: 'return'
    }
}