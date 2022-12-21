const Joi = require('joi');

const regexp = require("../enum/regexp.enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        phone: Joi.string().regex(regexp.PHONE).optional()
    }),

    EmailValidator: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required()
    }),

    PasswordValidator: Joi.object({
        password: Joi.string().regex(regexp.PASSWORD).required()
    }),



};