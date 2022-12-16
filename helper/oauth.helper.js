const bcrypt = require("bcrypt");

const tokenTypes = require("../enum/token-action.enum");
const { CONFIRM_ACCOUNT_ACTION_TOKEN, FORGOT_PASSWORD_ACTION_TOKEN } = require("../config/config");
const CustomError = require("../error/CustomError");

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password', 400);
        }
    },

    compareOldPasswords: async (hashPassword, password) => {
        return bcrypt.compare(password, hashPassword);
    },

    getSecretWordForActionToken: (actionType) => {
       let secretWord = '';

        switch (actionType) {
            case tokenTypes.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN;
                break
            case tokenTypes.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN;
                break
        }

        return secretWord;
    }
}