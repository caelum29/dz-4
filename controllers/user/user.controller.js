const {userService} = require('../../services');
const {checkHashPassword, hashPassword} = require('../../helpers');
const ErrorHandler = require('../../error/error-handler')

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();
            res.json(users)
        } catch (e) {
            next(new ErrorHandler(e));

        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = await hashPassword(user.password);

            await userService.create(user);
            res.sendStatus(201);
        } catch (e) {
            next(new ErrorHandler(e));
        }

    },
    getUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            // console.log(req.params)
            const user = await userService.getOne(userId);
            res.json(user);
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const isDeleted = await userService.delete(userId);
            isDeleted ? res.sendStatus(204) : next(new ErrorHandler('Delete error'));
        } catch (e) {
            next(new ErrorHandler(e));
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            // console.log(id)
            const user = req.body;
            user.password = await hashPassword(user.password);
            const [isUpdated] = await userService.update(userId, user);
            isUpdated ? res.sendStatus(200) : next(new ErrorHandler('Not updated', 444, 4444));
            res.json({updated: true})
        } catch (e) {
            next(new ErrorHandler(e));
        }

    },
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.getUserByParams({email});
            if (!user) {
                next(new ErrorHandler('No user', 400, 4005));
            }

            await checkHashPassword(user.password, password);
            res.json(user);

        } catch (e) {
            next(new ErrorHandler(e));
        }
    }
};
