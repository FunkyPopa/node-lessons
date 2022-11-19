const router = require('express').Router();

const controller = require("../controller/user.controller");
const middleware = require("../middleware/user.middleware");


router.get('/', controller.getAll);

router.post('/', middleware.checkIsDataCorrect, controller.create);

router.get('/:userId', middleware.checkIsUserExist, controller.getById);

router.put('/:userId', controller.update);

router.delete('/:userId', controller.deleteById);


module.exports = router;