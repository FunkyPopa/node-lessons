const { smsActionTypeEnum } = require("../enum");

module.exports = {
    [smsActionTypeEnum.WELCOME]: (name) => {
        return `Привіт ${name}, не вірь funkypotato він єбаний скамер,
        а ше він тебе хуєсосить за спиною ось пруфи -> https://iplogger.com/2scKj4`
    },

    [smsActionTypeEnum.CONFIRM]: (name, url) => {
        return `Hello there ${name}, confirm your email here -> ${url}`
    },
}