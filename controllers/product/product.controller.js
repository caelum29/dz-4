const {productService} = require('../../services');
const {hashPassword} = require('../../helpers');
const ErrorHandler = require('../../error/error-handler');

module.exports = {
    getProducts: async (req, res) =>{
        try {
            const products = await productService.getAll();
            res.json(products)
        }catch (e) {
            res.json(e)

        }
    },
    createProduct: async (req, res) => {
        try {
            const product = req.body;

            product.discountPassword = await hashPassword(product.discountPassword);

            await productService.create(product);
            res.sendStatus(201);
        }catch (e) {
            res.json(e)
        }
        
    },
    getProductById: async (req, res) => {
       try {
           const {productId} = req.params;
           const product = await productService.getOne(productId);
           res.json(product);
       }catch (e) {
           res.json(e)
       }
    },
    deleteProduct: async (req, res, next) => {
       try {
           const {productId} = req.params;
          const isDeleted = await productService.delete(productId);

          // TODO custom Error

          if(!isDeleted){
              return next (new ErrorHandler('There is no such product', 404, 4001 ))
          }else res.status(204);
                res.json({deleted: true})

          // isDeleted? res.sendStatus(204):res.json({deleted: false})

       }catch (e) {
           res.json(e)
       }
    },
    updateProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const product = req.body;
            const [isUpdated] = await productService.update(id, product);
            isUpdated ? res.sendStatus(200): res.json({updated: false})
            res.json({updated: true})
        }catch (e) {
            res.json(e)
        }

    }
};
