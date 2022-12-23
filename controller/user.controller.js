const { userService, s3Service } = require("../service");
const { s3ItemType } = require('../enum');
const {userPresenter} = require("../presenter");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const result = await userService.find(req.query);

            result.data = userPresenter.normalizeMany(result.data);
            res.json(result);
        } catch (e) {
            next(e);
        }

    },

    getById: async (req, res, next) => {
        try {
            const user = await userService.findByIdWithCars(req.user._id);

            res.json(user);
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

    },

    uploadAvatar: async (req, res, next) => {
        try {
            //save locally in static
            // const path = require('node:path');
            // const ext = path.extname(req.files.avatar.name);
            // const uploadPath = path.join(process.cwd(), 'static', `${Date.now()}${ext}`);
            //
            // req.files.avatar.mv(uploadPath, (err) => {
            //     if (err) {
            //         throw err;
            //     }
            // });

            const uploadedData = await s3Service.uploadPublicFile(req.files.avatar, s3ItemType.user, req.user._id);

            const updatedUser = await userService.updateById(req.user._id, { avatar: uploadedData.Location });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    updateAvatar: async (req, res, next) => {
        try {
            const uploadedData = await s3Service.updatePublicFile(req.user.avatar, req.files.avatar, req.user._id);

            const updatedUser = await userService.updateById(req.user._id, { avatar: uploadedData.Location });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteAvatar: async (req, res, next) => {
        try {
            await s3Service.deletePublicFile(req.user.avatar);

            const updatedUser = await userService.updateById(req.user._id, { avatar: null });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};