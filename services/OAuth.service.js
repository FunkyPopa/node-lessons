const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomError = require("../error/CustomError");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password ', 400);
        }
    },

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, 'secretWord', { expiresIn: '1m' });
        const refreshToken = jwt.sign(dataToSing, 'secretRefreshWord', { expiresIn: '2m' });


        // зробити через конфін ^^^^^ (витягнути в окрему константу)


        return {
            accessToken,
            refreshToken
        }
    }
}

// зроби шифрування токенів 1:25:00 +-