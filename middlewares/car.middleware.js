const CustomError = require("../error/CustomError");
const {carService} = require("../services");
const {carNormalizator} = require("../helper");

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = carService.findOneByParams({ _id: carId });

            if (!car) {
                throw new CustomError('Car does not exist', 404);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsBodyValid: (req, res, next) => {
        try {
            const carInfo = req.body;

            const currentYear = new Date().getFullYear()

            if(typeof carInfo.model !== typeof 'str' || carInfo.model.length < 2) {
                throw new CustomError('Model is invalid', 400);
            }

            if (typeof carInfo.year !== typeof 1 || carInfo.year < 1990 || carInfo.year > currentYear) {
                throw new CustomError(`Year must be a number and from 1990 to ${currentYear}`, 400);
            }

            if(typeof carInfo.price !== typeof 1 && carInfo.price <= 0) {
                throw new CustomError(`Price must be a number and more than 0`, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    carNormalizator: (req, res, next) => {

        let { model } = req.body;

        req.body.module = carNormalizator.model(model);

        next();
    }
};