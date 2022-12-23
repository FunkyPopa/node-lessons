const normalize = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt
    }
};

const normalizeMany = (users) => {
    return users.map(user => normalize(user));
};

module.exports = {
    normalize,
    normalizeMany
};