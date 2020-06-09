const Joi = require('joi');

const {
    responseStatusCodeEnum: {OK, NOT_FOUND: NOT_FOUND_CODE, BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID, NOT_FOUND},
    requestHeaderEnum: {AUTHORIZATION}
} = require('../../constants');
const ErrorHandler = require('../../error/error-handler');
const {userValidator: {updateUserSchema}} = require('../../validators');
const {userService, authService} = require('../../services');
const {checkHashPassword, tokenizer} = require('../../helpers');


module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error} = Joi.validate({email, password}, updateUserSchema);
            if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

            const user = await userService.getUserByParams({email});
            if (!user) return next(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode));
            await checkHashPassword(password, user.password);
            const tokens = tokenizer();
            authService.createTokenPair({...tokens, userId: user.id});
            res.json(tokens)
        } catch (e) {
            next(e)
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);
            console.log(access_token);
            await authService.deleteTokenByParams({access_token});
            res.sendStatus(OK)
        } catch (e) {
            next(e)
        }

    },
    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const userId = req.userId;
            const user = await userService.getOne(userId);

            if (!user) return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)));

            const tokens = tokenizer();

            await authService.deleteTokenByParams({refresh_token});
            await authService.createTokenPair({...tokens, userId});
            res.json(tokens)
        } catch (e) {
            next(e)
        }
    }
};

