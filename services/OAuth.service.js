const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomError = require("../error/CustomError");
const configs = require('../config/config');
const {ACCESS_KEY, REFRESH_KEY} = require("../config/config");
const OAuth = require('../dataBase/OAuth');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password ', 400);
        }
    },

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, configs.ACCESS_KEY,{ expiresIn: '1m' });
        const refreshToken = jwt.sign(dataToSing, configs.REFRESH_KEY,{ expiresIn: '2m' });

        return {
            accessToken,
            refreshToken
        }
    },

    // checkToken: (token = '', tokenType = 'accessToken') => {
    //     try {
    //         let secret = '';
    //
    //         if(tokenType === 'accessToken') secret = ACCESS_KEY;
    //         else if(tokenType === 'refreshToken') secret = REFRESH_KEY;
    //
    //         return jwt.verify(token, secret);
    //     } catch (e) {
    //         throw new CustomError('Token not valid!!!!!!', 401);
    //     }
    //
    // },

    // findToken: async (token) => {
    //
    // }
}
