const router = require('express').Router();

const controller = require("../controllers/user.controller");
const middleware = require("../middlewares/user.middleware");


router.get('/', controller.getAll);

router.post('/', middleware.checkIsDataCorrect, controller.create);

router.get('/:userId', middleware.checkIsUserExist, controller.getById);

router.put('/:userId',middleware.checkIsUserExist, middleware.checkIsDataCorrect, controller.update);

router.delete('/:userId', middleware.checkIsUserExist, controller.deleteById);


module.exports = router;