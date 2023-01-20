const router = require('express').Router();

const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");


router.get('/', controller.getAll);

router.post('/',
    middleware.isNewUserValid,
    middleware.checkIsEmailUnique,
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
    middleware.userNormalizator,
    controller.update
);

router.delete('/:userId',
    middleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    controller.deleteById
);


module.exports = router;
