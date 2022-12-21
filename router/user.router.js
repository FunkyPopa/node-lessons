const router = require('express').Router();

const controller = require("../controller/user.controller");
const middleware = require("../middleware/user.middleware");
const authMiddleware = require("../middleware/auth.middleware");


router.get('/', controller.getAll);

router.post('/',
    middleware.isNewUserValid,
    middleware.isUserNameValid,
    middleware.checkIsEmailUnique,
    middleware.checkIsPhoneUnique,
    middleware.userNormalizator,
    controller.create
);

router.get('/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.getById
);

router.put('/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    authMiddleware.checkAccessToken,
    middleware.getUserDynamically('userId', 'params', '_id'),
    middleware.isUserNameValid,
    middleware.userNormalizator,
    controller.update
);

router.delete('/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    controller.deleteById
);


module.exports = router;