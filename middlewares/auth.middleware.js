const authValidator = require('../validators/auth.validator');
const oauthService = require('../services/OAuth.service');
const CustomError = require("../error/CustomError");

const OAuth = require('../dataBase/OAuth');

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

    // checkAccessToken: async (req, res, next) => {
    //     try {
    //        const accessToken = req.get('Authorization');
    //
    //         if (!accessToken) {
    //             throw new CustomError('No token', 401);
    //         }
    //
    //          oauthService.checkToken(accessToken);
    //
    //        // const tokenInfo = await oauthService.findToken(accessToken);
    //         const tokenInfo = await OAuth.findOne({ accessToken });
    //
    //         if (!tokenInfo) {
    //             throw new CustomError("Token isn't valid", 401);
    //         }
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}