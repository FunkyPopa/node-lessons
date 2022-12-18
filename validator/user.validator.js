const Joi = require('joi');
const regexp = require('../enum/regexp.enum')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(10).default(''),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        phone: Joi.string().regex(regexp.PHONE).optional(),
    }),

    editUserValidator: Joi.object({
        name: Joi.string().min(2).max(10).default('').optional(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().optional(),
        phone: Joi.string().regex(regexp.PHONE).optional(),
    }),
}