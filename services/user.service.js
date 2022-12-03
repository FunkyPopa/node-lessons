const User = require("../dataBase/User");

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    findByIdWithCars: async (userId) => {
        const result = await User.aggregate([
            {
                $match: { _id: userId }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars'
                }
            }
        ]);

        return result[0];
    },

    getUserDynamically: async (filter = {}) => {
        return User.findOne(filter);
    },

    create: async (userInfo) => {
        return User.create(userInfo);
    },

    updateById: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo);
    },

    deleteById: async (userId) => {
        return User.deleteOne({ _id: userId });
    }
}