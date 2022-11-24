const Car = require("../dataBase/Car");
const User = require("../dataBase/User");

module.exports = {
    findByParams: async (filter = {}) => {
        return Car.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return Car.findOne(filter);
    },

    create: async (carInfo) => {
        return Car.create(carInfo);
    },

    updateById: async (carId, newCarInfo) => {
        return Car.findByIdAndUpdate(carId, newCarInfo);
    },

    deleteById: async (carId) => {
        return Car.deleteOne({ _id: carId });
    }
}