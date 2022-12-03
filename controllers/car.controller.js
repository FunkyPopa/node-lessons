const Car = require('../dataBase/Car');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    }
}