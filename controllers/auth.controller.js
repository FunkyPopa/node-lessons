const { userService, oldPasswordService, emailService, oauthService } = require("../services");
const {WELCOME, FORGOT_PASS, RETURN} = require("../enums/email-actions.enum");
const {FORGOT_PASSWORD} = require("../enums/token-action.enum");
const {FRONTEND_URL} = require("../config/config");


module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({ id: user._id });

            await oauthService.createAccessTokensInfo({ ...tokenPair, _user_id: user._id });

            await emailService.sendEmail(user.email, WELCOME, { userName: user.name, /*array: [{ number: 1 }, { number: 2 }, { number: 3 }]*/ });

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

            await oauthService.deleteAccessTokensInfo({ refreshToken });

            const tokenPair = oauthService.generateAccessTokenPair({ id: _user_id });

            await oauthService.createAccessTokensInfo({ ...tokenPair, _user_id });

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req.tokenInfo;

            await oauthService.deleteAccessTokensInfo({ accessToken });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;

            await oauthService.deleteAllAccessTokensInfo({_user_id});

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
            await emailService.sendEmail(user.email, FORGOT_PASS, { url: forgotPassFrontURL, userName: user.name });

            res.status(201).json({ actionToken: actionToken });
        } catch (e) {
            next(e);
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await oldPasswordService.create({ _user_id: user._id, password: user.password });

            await userService.updateById({_id: user._id}, {password: hashPassword});
            await oauthService.deleteActionTokenInfo({token: req.get('Authorization') });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}
