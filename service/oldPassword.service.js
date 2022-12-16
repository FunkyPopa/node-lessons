const OldPassword = require('../dataBase/OldPassword');

module.exports = {
    find: (filter) => {
        return OldPassword.find(filter);
    },

    create: (data) => {
        return OldPassword.create(data);
    },

    delete: (filter) => {
        return OldPassword.deleteMany(filter);
    },
}