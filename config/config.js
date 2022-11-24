module.exports = {
    PORT: process.env.PORT || 5002,
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/testDB',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'secretWord',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'secretRefreshWord'
}