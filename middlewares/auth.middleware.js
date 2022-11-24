const authValidator = require('../validators/auth.validator');
const CustomError = require("../error/CustomError");

module.exports = {
    isBodyValid: (req, res, next) => {
        try {

            const validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}