const productRouter = require('express').Router();

const {isProductValid, isPdoductExist} = require('../../middlewares');

const {productController} = require('../../controllers');

productRouter.get('/', productController.getProducts);
productRouter.post('/', isProductValid, productController.createProduct);

// productRouter.get('/:productId',isPdoductExist);

productRouter.get('/:productId', productController.getProductById);
productRouter.put('/:productId', isProductValid, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;
