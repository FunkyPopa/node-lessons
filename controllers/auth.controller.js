const oauthService = require('../services/OAuth.service');
const emailService = require('../services/email.service');
const {WELCOME} = require("../config/email-actions-enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await emailService.sendEmail('andreybuno333@gmail.com', WELCOME, {userName: user.name});

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({ id: user._id });

            await oauthService.createTokensInfo({ ...tokenPair, _user_id: user._id });

            res.status(201).json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
          const { refreshToken, _user_id } = req.tokenInfo;

            await oauthService.deleteTokensInfo({ refreshToken });

            const tokenPair = oauthService.generateAccessTokenPair({ id: _user_id });

            await oauthService.createTokensInfo({ ...tokenPair, _user_id });

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req.tokenInfo;

            await oauthService.deleteTokensInfo({ accessToken });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;

            await oauthService.deleteAllTokensInfo({ _user_id })

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}
