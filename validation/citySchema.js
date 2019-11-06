const Joi = require('@hapi/joi');

const schemas = {
    getCity: Joi.object().keys({
        query: Joi.string().min(1).required()
    })
};
module.exports = schemas;