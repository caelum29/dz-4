const authRouter = require('express').Router();

const {checkAccessToken, checkRefreshToken} = require('../../middlewares');

const {authController} = require('../../controllers');

authRouter.post('/', authController.loginUser);
authRouter.post('/logout',checkAccessToken, authController.logoutUser);
authRouter.post('/refresh',checkRefreshToken, authController.refreshToken);

module.exports = authRouter;
