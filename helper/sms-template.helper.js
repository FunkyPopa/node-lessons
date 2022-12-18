const { smsActionTypeEnum } = require("../enum");

module.exports = {
    [smsActionTypeEnum.WELCOME]: (name) => {
        return `Hi ${name}, welcome on our platform!`
    },

    [smsActionTypeEnum.CONFIRM]: (name, url) => {
        return `Hello there ${name}, confirm your email here -> ${url}`
    },
}