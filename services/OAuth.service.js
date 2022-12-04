const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const OAuth = require('../dataBase/OAuth');
const CustomError = require("../error/CustomError");
const {ACCESS_KEY, REFRESH_KEY} = require("../config/config");
const { tokenTypeEnum } = require('../enums');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password ', 400);
        }
    },

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, ACCESS_KEY,{ expiresIn: '15s' });
        const refreshToken = jwt.sign(dataToSing, REFRESH_KEY,{ expiresIn: '1m' });

        return {
            accessToken,
            refreshToken
        }
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

    findToken: async (token) => {
        return OAuth.findOne({ token });
    }
}
