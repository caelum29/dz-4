const Joi = require('joi');
const userValidationSchema = require('../validators/user/new-user.validator.js');
const ErrorHandler = require('../error/error-handler');

module.exports = async (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, userValidationSchema);
        // console.log(error.details[0].message);
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400, 4001))
        }

        next();
    } catch (e) {
        res.json({error: true})
    }
};
