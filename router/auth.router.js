const router = require('express').Router();

const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');


router.post('/login', middleware.isBodyValid, userMiddleware.getUserDynamically('email'), controller.login);

router.post('/refresh', middleware.checkRefreshToken, controller.refresh);

router.post('/logout', middleware.checkAccessToken, controller.logout);

router.post('/logoutALL', middleware.checkAccessToken, controller.logoutAll);

router.post('/password/forgot', middleware.isEmailValid, userMiddleware.getUserDynamically('email'), controller.forgotPassword);

router.put('/password/forgot', middleware.isNewPasswordValid, middleware.checkActionToken, middleware.checkOldPassword, controller.setPasswordAfterForgot);


module.exports = router;