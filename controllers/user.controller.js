const { userService, oauthService, emailService } = require("../services");
const { FORGOT_PASS } = require("../enums/email-actions.enum");

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
            await emailService.sendEmail('andreybuno333@gmail.com', FORGOT_PASS)

            const user = await userService.findByIdWithCars(req.user._id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {

            const hashPassword = await oauthService.hashPassword(req.body.password);

            const user = await userService.create({ ...req.body, password: hashPassword });

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