const authValidator = require('../validators/auth.validator');
const oauthService = require('../services/oAuth.service');
const CustomError = require("../error/CustomError");
const { tokenTypeEnum } = require("../enums");
const { FORGOT_PASSWORD } = require("../enums/token-action.enum");
const { oldPasswordService } = require("../services");
const { compareOldPasswords } = require("../services/oAuth.service");

module.exports = {
    isBodyValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailValid: async (req, res, next) => {
        try {
            const validate = authValidator.EmailValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNewPasswordValid: async (req, res, next) => {
        try {
            const validate = authValidator.PasswordValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
           const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new CustomError('No token', 401);
            }

            oauthService.checkToken(accessToken);

            const tokenInfo = await oauthService.findAccessTokens({ accessToken });

            if (!tokenInfo) {
                throw new CustomError("Token isn't valid", 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new CustomError('No token', 401);
            }

            oauthService.checkToken(refreshToken,  tokenTypeEnum.refreshToken);

            const tokenInfo = await oauthService.findAccessTokens({ refreshToken });

            if (!tokenInfo) {
                throw new CustomError("Token isn't valid", 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                throw new CustomError('No token', 401);
            }

            oauthService.checkActionToken(actionToken, FORGOT_PASSWORD);

            const tokenInfo = await oauthService.findActionToken({ token: actionToken, tokenType: FORGOT_PASSWORD });

            if (!tokenInfo) {
                throw new CustomError("Token isn't valid", 401);
            }

            req.user = tokenInfo._user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkOldPassword: async (req, res, next) => {
        try {
            const { user, body } = req;
            const oldPasswords = await oldPasswordService.find({ _user_id: user._id }).lean();

            if (!oldPasswords.length){
                return next();
            }

            const isPasswordsSame = await Promise.all(oldPasswords.map((record) => compareOldPasswords(record.password, body.password)));

            const condition = isPasswordsSame.some((res) => res)

            if (condition) {
                throw new CustomError('This is old password', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}