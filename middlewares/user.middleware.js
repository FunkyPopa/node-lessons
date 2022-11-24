const CustomError = require("../error/CustomError");
const {userNormalizator} = require("../helper");
const {userService} = require("../services");
const userValidator = require('../validators/user.validator');
const commonValidator = require('../validators/common.validators');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.findOneByParams({ _id: userId });

            if (!user) {
                throw new CustomError('User does not exist', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }

    },

    checkIsEmailUnique: async (req, res, next) => {
      try {
          const { email } = req.body;

          if(!email) {
              throw new CustomError('Email not present', 400);
          }

          const user = await userService.findOneByParams({ email });

          if(user) {
              throw new CustomError('User with this email already exist');
          }

          next();
      } catch (e) {
          next(e);
      }
    },

    checkIsBodyValid: async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            if(!name || typeof name !== 'string' || name.length < 2) {
                throw new CustomError('Name is invalid', 400);
            }

            if(!email || typeof email !== 'string' || !email.includes("@")) {
                throw new CustomError('Email is invalid', 400);
            }

            if(!password || typeof password !== 'string' || password.length < 6) {
                throw new CustomError('Password is invalid', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNewUserValid: async (req, res, next) => {
      try {

        const validate = userValidator.newUserValidator.validate(req.body);

        if (validate.error) {
            throw new CustomError(validate.error.message, 400);
        }

        req.body = validate.value;

          next();
      } catch (e) {
          next(e);
      }

    },

    isUserIdValid: async (req, res, next) => {
        try {

          const { userId } = req.params;

          const validate = commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }

    },

    userNormalizator: (req, res, next) => {

        let { name, email, password } = req.body;

        req.body.name = userNormalizator.name(name);
        req.body.email = email.toLowerCase();

        next();
    }
};