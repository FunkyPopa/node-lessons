const CustomError = require("../error/CustomError");
const {IMAGE_MAX_SIZE, IMAGE_MIMETYPE} = require("../config/fileUpload.config");

module.exports = {
    checkUploadImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new CustomError('No files to upload', 400);
            }

            const imagesToUpload = Object.values(req.files);

            for (const image of imagesToUpload) {
                const { size, mimetype, name } = image;

                if (size > IMAGE_MAX_SIZE) {
                    throw new CustomError(`File ${name} is too big`);
                }

                if (!IMAGE_MIMETYPE.includes(mimetype)) {
                    throw new CustomError(`File ${name} has invalid format`, 400);
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};