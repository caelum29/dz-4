const productRouter = require('express').Router();

const {isProductValid} = require('../../middlewares');

const {productController} = require('../../controllers');

productRouter.get('/', productController.getProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.post('/',isProductValid, productController.createProduct);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.put('/:productId',isProductValid, productController.updateProduct);

module.exports = productRouter;
