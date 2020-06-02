const {userService} = require('../../services');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAll();
            res.json(users)
        } catch (e) {
            res.json(e)

        }
    },
    createUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.create(user);
            res.sendStatus(201);
        } catch (e) {
            res.json(e)
        }

    },
    getUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = await userService.getOne(userId);
            res.json(user);
        } catch (e) {
            res.json(e)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const isDeleted = await userService.delete(userId);
            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            res.json(e)
        }
    },
    updateUser: async (req, res) => {
        try {
            const {userId} = req.params;
            const user = req.body;
            const [isUpdated] = await userService.update(userId, user);
            isUpdated ? res.sendStatus(200) : res.json({updated: false});
            res.json({updated: true})
        } catch (e) {
            res.json(e)
        }

    }
};
