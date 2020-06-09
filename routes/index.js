const router = require('express').Router();

const userRouter = require('./user/user.router')
const productRouter = require('./product/product.router')
const authRouter = require('./auth/auth.router')
const {notFoundController} = require('../controllers');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/auth', authRouter);
// router.use('/', notFoundController);

router.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
            })
})

module.exports = router;
