const router = require('express').Router();

const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/user.middleware");


router.get('/', controller.getAll);

router.post('/', middleware.isNewUserValid, middleware.checkIsBodyValid, middleware.checkIsEmailUnique, middleware.userNormalizator, controller.create);

router.get('/:userId', middleware.isUserIdValid, middleware.checkIsUserExist, controller.getById);

router.put('/:userId', middleware.isUserIdValid, middleware.checkIsUserExist, middleware.checkIsBodyValid, middleware.userNormalizator, controller.update);

router.delete('/:userId', middleware.isUserIdValid, middleware.checkIsUserExist, controller.deleteById);


module.exports = router;