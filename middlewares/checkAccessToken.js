const jwt = require('jsonwebtoken');
const {
    requestHeaderEnum: {AUTHORIZATION},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN},
    responseStatusCodeEnum: {BAD_REQUEST, UNAUTHORIZED},
    tokenEnum: {JWT_SECRET}
} = require('../constants');
const authService = require('../services/auth.service');
const ErrorHandler = require('../error/error-handler');

module.exports = async (req, res, next) => {
    try {
        const authorizationToken = req.get(AUTHORIZATION);

        if (!authorizationToken) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

        jwt.verify(authorizationToken, JWT_SECRET, err => {
            if (err) return next(new ErrorHandler(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, UNAUTHORIZED.customCode)))
        });
        const tokenFromDB = await authService.getTokenByParams({access_token: authorizationToken});
        if (!tokenFromDB) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.customCode));
        req.userId = tokenFromDB.userId;
        next()

    }catch (e) {
        next(e)
    }
};
