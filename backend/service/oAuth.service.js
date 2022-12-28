const jwt = require('jsonwebtoken');

const OAuth = require('../dataBase/OAuth');
const ActionToken = require('../dataBase/ActionToken');
const CustomError = require("../error/CustomError");
const { tokenTypeEnum } = require('../enum');
const { ACCESS_KEY, REFRESH_KEY } = require("../config/config");
const oauthHelper = require("../helper/oauth.helper");

module.exports = {

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, ACCESS_KEY, { expiresIn: '5m' });
        const refreshToken = jwt.sign(dataToSing, REFRESH_KEY, { expiresIn: '10m' });

        return {
            accessToken,
            refreshToken
        }
    },

    generateActionToken: (actionType, dataToSing = {}) => {

        const secretWord = oauthHelper.getSecretWordForActionToken(actionType);

        return jwt.sign(dataToSing, secretWord, { expiresIn: '2m' });

    },

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_KEY;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_KEY;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid!', 401);
        }

    },

    checkActionToken: (token, actionType) => {
        try {
            const secretWord = oauthHelper.getSecretWordForActionToken(actionType);

           return jwt.verify(token, secretWord);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },


    findAccessTokens: async (token) => {
        return OAuth.findOne(token)
    },

    createAccessTokensInfo: async (tokensInfo) => {
        return OAuth.create(tokensInfo);
    },

    deleteAccessTokensInfo: async (filter) => {
        return OAuth.deleteOne(filter);
    },

    deleteAllAccessTokensInfo: async (filter) => {
        return OAuth.deleteMany(filter);
    },


    findActionToken: async (token) => {
        return ActionToken
            .findOne(token)
            .populate('_user_id');
    },

    createActionTokenInfo: async (tokenInfo) => {
        return ActionToken.create(tokenInfo);
    },

    deleteActionTokenInfo: async (filter) => {
        return ActionToken.deleteOne(filter);
    }

};
