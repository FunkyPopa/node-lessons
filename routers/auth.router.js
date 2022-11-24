const router = require('express').Router();

const controller = require('../controllers/auth.controller');
const middleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/login', middleware.isBodyValid, userMiddleware.getUserDynamically('email'), controller.login);


module.exports = router;