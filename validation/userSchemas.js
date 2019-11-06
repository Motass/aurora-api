const Joi = require('@hapi/joi');

const schemas = {
    register: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    }),
    update: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
};
module.exports = schemas;