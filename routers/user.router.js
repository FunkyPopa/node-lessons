const router = require('express').Router();

const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/user.middleware");


router.get('/', controller.getAll);

router.post('/', middleware.isNewUserValid,
    middleware.checkIsBodyValid,
    middleware.checkIsEmailUnique,
    middleware.userNormalizator,
    controller.create
);

router.get('/:userId',
    middleware.isUserIdValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    controller.getById
);

router.put('/:userId',
    middleware.isUserIdValid,
    middleware.isEditUserValid,
    middleware.getUserDynamically('userId', 'params', '_id'),
    middleware.checkIsBodyValid,
    middleware.userNormalizator,
    controller.update
);

router.delete('/:userId', middleware.isUserIdValid, controller.deleteById);


module.exports = router;