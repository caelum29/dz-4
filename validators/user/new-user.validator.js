const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().required().min(3).max(20).trim(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4)
});

