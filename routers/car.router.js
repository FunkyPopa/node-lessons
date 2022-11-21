const router = require("express").Router();

const controller = require("../controllers/car.controller");
const middleware = require("../middlewares/car.middleware");


router.get('/', controller.getAll);

router.post('/', middleware.checkIsDataCorrect, controller.create);

router.get('/:carId', middleware.checkIsUserExist, controller.getById);

router.put('/:carId',middleware.checkIsUserExist, middleware.checkIsDataCorrect, controller.update);

router.delete('/:carId', middleware.checkIsUserExist, controller.deleteById);


module.exports = router;