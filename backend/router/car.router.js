const router = require('express').Router();

const controller = require('../controller/car.controller');

router.get('/', controller.getAll);

// router.get('/carId',); middleware, controller, cr!,up!,de!;

module.exports = router;