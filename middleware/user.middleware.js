const userDB = require("../users/users.json");

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = userDB[userId - 1];

            if (!user) {
                throw new Error('User does not exist');
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsDataCorrect: async (req, res, next) => {
        try {
            const userInfo = req.body;

            if(typeof userInfo.name === typeof 'str' && userInfo.age > 0) {
                if (isNaN(userInfo.age)) {
                    throw new Error('Age must be a number');
                } else {
                    req.data = userInfo
                }
            } else {
                throw new Error('Name or Age is invalid');
            }
        } catch (e) {
            next(e);
        }
    }
};