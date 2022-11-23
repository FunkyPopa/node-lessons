module.exports = {
    PORT: process.env.PORT || 5002,
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/testDB'
}