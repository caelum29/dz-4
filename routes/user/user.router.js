const userRouter = require('express').Router();

// const {isProductExist, isProductValid} = require('../../middlewares');
const {userController} = require('../../controllers');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUser);

userRouter.post('/', userController.createUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

module.exports = userRouter;
