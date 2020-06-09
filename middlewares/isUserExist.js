const ErrorHandler = require('../error/error-handler');
const userService = require('../services/product.service');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (isNaN(id) || +id < 0) return next(new ErrorHandler({message: 'User is not valid'}));
        const user = await userService.getOne(id);
        if (!user) return next(new ErrorHandler({message: 'User is not valid'}));
        req.user = user;
        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
