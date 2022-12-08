const oauthService = require('../services/OAuth.service');
const emailService = require('../services/email.service');
const {WELCOME, FORGOT_PASS} = require("../config/email-actions-enum");
const {FORGOT_PASSWORD} = require("../config/token-action.enum");
const {FRONTEND_URL} = require("../config/config");
const {userService} = require("../services");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({ id: user._id });

            await oauthService.createTokensInfo({ ...tokenPair, _user_id: user._id });

            await emailService.sendEmail('andreybuno333@gmail.com', WELCOME, {userName: user.name});

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
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, { email: user.email });
            const forgotPassFrontURL = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await oauthService.createActionTokenInfo({ _user_id: user._id, token: actionToken, tokenType: FORGOT_PASSWORD });
            await emailService.sendEmail('andreybuno333@gmail.com', FORGOT_PASS, { url: forgotPassFrontURL });

            res.status(201).json({actionToken: actionToken});
        } catch (e) {
            next(e);
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            await userService.updateById({_id: req.user._id}, { password: hashPassword });
            await oauthService.deleteActionTokenInfo({ token: req.get('Authorization') });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}
