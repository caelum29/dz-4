// const bcrypt = require('bcrypt');
const {productService} = require('../../services');
const {hashPassword} = require('../../helpers');
const ErrorHandler = require('../../error/error-handler');

module.exports = {
    getProducts: async (req, res, next) => {
        try {
            const products = await productService.getAll();
            res.json(products)
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const product = req.body;

            product.discountPassword = await hashPassword(product.discountPassword);

            await productService.create(product);
            res.sendStatus(201);
        } catch (e) {
            next(new ErrorHandler(e));
        }

    },
    getProductById: async (req, res, next) => {
        try {
            res.json(req.product);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const isDeleted = await productService.delete(productId);

            // TODO custom Error

            if (!isDeleted) {
                return next(new ErrorHandler('There is no such product', 404, 4001))
            } else res.status(204);
            res.json({deleted: true})

            // isDeleted? res.sendStatus(204):res.json({deleted: false})

        } catch (e) {
            next(new ErrorHandler(e));
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            console.log(req.params);
            const product = req.body;
            // console.log(product);

            product.discountPassword = await hashPassword(product.discountPassword);

            const [isUpdated] = await productService.update(productId, product);
            console.log(isUpdated);
            isUpdated ? res.sendStatus(200) : next(new ErrorHandler('Not updated', 444, 4444));
        } catch (e) {
            next(new ErrorHandler(e));
        }
    }
};
