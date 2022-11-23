const {carService, userService} = require("../services");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const cars = carService.findByParams();

            await res.json(cars);
        } catch (e) {
            next(e);
        }

    },

    getById: async (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const car = await carService.create(req.body);

            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const newCarInfo = req.body;
            const { carId } = req.params;

            await carService.updateById(carId, newCarInfo);

            res.status(201).json('Updated');
        } catch (e) {
            next(e);
        }



    },

    deleteById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteById(carId);

            await res.status(200).json('Deleted!');
        } catch (e) {
            next(e);
        }

    }
};