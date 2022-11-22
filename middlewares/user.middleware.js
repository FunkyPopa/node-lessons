const userDB = require("../DB/users/users.json");
const CustomError = require("../error/CustomError");

module.exports = {
    checkIsUserExist: (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = userDB[userId - 1];

            if (!user) {
                throw new CustomError('User does not exist', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }

    },
    checkIsDataCorrect: (req, res, next) => {
        try {
            const userInfo = req.body;

            if(typeof userInfo.name === typeof 'string' && userInfo.age > 0) {
                if (Number.isNaN(+userinfo.age)) {
                    throw new CustomError('Age must be a number', 400);
                } else {
                    req.data = userInfo;
                    next();
                }
            } else {
                throw new CustomError('Name or age is invalid', 400);
            }

        } catch (e) {
            next(e);
        }
    }
};
