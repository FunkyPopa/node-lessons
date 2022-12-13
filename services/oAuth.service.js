const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const OAuth = require('../dataBase/OAuth');
const ActionToken = require('../dataBase/ActionToken');
const CustomError = require("../error/CustomError");
const { tokenTypeEnum } = require('../enums');
const {ACCESS_KEY, REFRESH_KEY} = require("../config/config");
const oauthHelper = require("../helpers/oauth.helper");

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

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, ACCESS_KEY, {expiresIn: '15s'});
        const refreshToken = jwt.sign(dataToSing, REFRESH_KEY, {expiresIn: '2m'});

        return {
            accessToken,
            refreshToken
        }
    },

    generateActionToken: (actionType, dataToSing = {}) => {

        const secretWord = oauthHelper.getSecretWordForActionToken(actionType);

        return jwt.sign(dataToSing, secretWord, {expiresIn: '1m'});

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
        return OAuth.findOne(token);
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
