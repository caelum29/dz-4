const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().required().min(3).max(20).trim(),
    price: Joi.number().required().min(2),
    description: Joi.string().optional().allow(null, ''),
    discountPassword: Joi.string().required().min(6)
});
