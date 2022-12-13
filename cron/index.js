const removeOldTokens = require('./removeOldTokens');
const removeOldPasswords = require('./removeOldPasswords');
const mailingBack = require('./mailingBack');

const cronRunner = () => {
    removeOldTokens.start();
    removeOldPasswords.start();
    mailingBack.start();
};

module.exports = {
    cronRunner,
};
