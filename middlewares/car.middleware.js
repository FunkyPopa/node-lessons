const carDB = require("../DB/cars/cars.json");
const CustomError = require("../error/CustomError");

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const { carId } = req.params;
            const car = carDB[carId - 1];

            if (!car) {
                throw new CustomError('Car does not exist', 404);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsDataCorrect: (req, res, next) => {
        try {
            const carInfo = req.body;

            const currentYear = new Date().getFullYear()
            console.log(currentYear);

            if(typeof carInfo.model === typeof 'str' && carInfo.model.length > 2) {
                if (typeof carInfo.year === typeof 1 && carInfo.year >= 1990 && carInfo.year < currentYear) {
                    if(typeof carInfo.price === typeof 1 && carInfo.price > 0) {
                        req.data = carInfo;
                        next();
                    } else {
                        throw new CustomError(`Price must be a number and more than 0`, 400);
                    }
                } else {
                    throw new CustomError(`Year must be a number and from 1990 to ${currentYear}`, 400);
                }
            } else {
                throw new CustomError('Model is invalid', 400);
            }
        } catch (e) {
            next(e);
        }
    }
};