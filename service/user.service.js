const User = require("../dataBase/User");

module.exports = {
    find: async (query) => {
        const { limit = 10, page = 1, name, age } = query;

        let findObj = {};

        if (name) {
            findObj = {
                ...findObj,
                name: { $regex: name }
            }
        }

        // if (age) {
        //     findObj = {
        //         ...findObj,
        //         age: { $eq: +age }
        //
        // }

        const [data, count] = await Promise.all([
            User.find(findObj).limit(limit).skip((page - 1) * limit), // pagination
            User.count(findObj).limit(limit),
        ]);

        return {
            data,
            page: +page,
            count,
        };

    },

    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    findByIdWithCars: async (userId) => {
        const result = await User.aggregate([
            {
                $match: {
                    _id: userId
                }
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
        return User.createWithHashPassword(userInfo);
    },

    updateById: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo, { new: true });
    },

    deleteById: async (userId) => {
        return User.deleteOne({ _id: userId });
    }
}