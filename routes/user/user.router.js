const userRouter = require('express').Router();

const {isUserValid} = require('../../middlewares/');
const {userController} = require('../../controllers');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/auth',isUserValid, userController.loginUser);
userRouter.get('/:userId', userController.getUser);

userRouter.post('/',isUserValid, userController.createUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.put('/:userId',isUserValid, userController.updateUser);

module.exports = userRouter;
