const {userService} = require("../services");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }

    },

    getById: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
           const user = await userService.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const newUserInfo  = req.body;
            const { userId } = req.params;

            await userService.updateById(userId, newUserInfo);

            res.status(201).json('Updated');
        } catch (e) {
            next(e);
        }



    },

    deleteById: async (req, res, next) => {
        try {
            await userService.deleteById(req.params.userId);

            res.status(200).json('Deleted!');
        } catch (e) {
            next(e);
        }

    }
};