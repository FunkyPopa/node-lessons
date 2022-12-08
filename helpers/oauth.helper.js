const tokenTypes = require("../config/token-action.enum");
const {CONFIRM_ACCOUNT_ACTION_TOKEN, FORGOT_PASSWORD_ACTION_TOKEN} = require("../config/config");

module.exports = {
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