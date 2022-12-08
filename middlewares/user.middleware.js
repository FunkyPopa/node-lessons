const CustomError = require("../error/CustomError");
const {userNormalizator} = require("../helpers");
const {userService} = require("../services");
const userValidator = require('../validators/user.validator');
const commonValidator = require('../validators/common.validators');


module.exports = {

   getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userService.getUserDynamically({ [dbField]: fieldToSearch });

            if (!user) {
                throw new CustomError('User not found', 404);
            }

            req.user = user

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
              throw new CustomError('User with this email already exist', 400);
          }

          next();
      } catch (e) {
          next(e);
      }
    },

    isUserNameValid: async (req, res, next) => {
        try {
            const { name } = req.body;

            if(!name || typeof name !== 'string' || name.length < 2) {
                throw new CustomError('Name is invalid', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEditUserValid: async (req, res, next) => {
      try {

        const validate = userValidator.editUserValidator.validate(req.body);

        if (validate.error) {
            throw new CustomError(validate.error.message, 400);
        }

        req.body = validate.value;

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

        let { name, email } = req.body;

        req.body.name = userNormalizator.name(name);
        req.body.email = email.toLowerCase();

        next();
    }
};