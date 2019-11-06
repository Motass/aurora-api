const Joi = require('@hapi/joi');

const validator = (schema, requestKey = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[requestKey]);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(422).json({ message: message }) }
    }
};
module.exports = validator;