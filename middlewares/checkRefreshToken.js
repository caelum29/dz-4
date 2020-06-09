const jwt = require('jsonwebtoken');
const {
    requestHeaderEnum: {AUTHORIZATION},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN},
    responseStatusCodeEnum: {BAD_REQUEST, UNAUTHORIZED},
    tokenEnum: {JWT_SECRET_REFRESH}
} = require('../constants');
const authService = require('../services/auth.service');
const ErrorHandler = require('../error/error-handler');

module.exports = async (req, res, next) => {
    try {
        const refreshToken = req.get(AUTHORIZATION);

        if (!refreshToken) return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));

        jwt.verify(refreshToken, JWT_SECRET_REFRESH, err => {
            if (err) return next(new ErrorHandler(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, UNAUTHORIZED.customCode)))
        });
        const tokenFromDB = await authService.getTokenByParams({refresh_token: refreshToken});
        if (!tokenFromDB) return next(new ErrorHandler(NOT_VALID_TOKEN.message, UNAUTHORIZED, NOT_VALID_TOKEN.customCode));
        req.userId = tokenFromDB.userId;
        next()

    }catch (e) {
        next(e)
    }
};
