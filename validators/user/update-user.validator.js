const Joi = require('joi');

module.exports = Joi.object().keys({
    email: Joi.string().optional().email().trim(),
    password: Joi.string().optional().min(4).trim()
});

