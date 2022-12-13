const Joi = require('joi')

const { MONGO_ID } = require('../enums/regexp.enum')

module.exports = {
    idValidator: Joi.string().regex(MONGO_ID)
}