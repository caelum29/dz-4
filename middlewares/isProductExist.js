// const Joi = require('joi');
const ErrorHandler = require('../error/error-handler');
const pdoductService = require('../services/product.service');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (isNaN(id) || +id < 0) return next(new ErrorHandler({message: 'Product is not valid'}));
        const product = await pdoductService.getOne(id);
        if (!product) return next(new ErrorHandler({message: 'Product is not valid'}));
        req.product = product;
        next();
    } catch (e) {
        next(new ErrorHandler(e));
    }
};
