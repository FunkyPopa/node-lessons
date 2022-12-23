module.exports = {
    PORT: process.env.PORT || 5002,
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/testDB',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'secretWord',
    REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'secretRefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN: process.env.CONFIRM_ACCOUNT_ACTION_TOKEN || 'CAATS',
    FORGOT_PASSWORD_ACTION_TOKEN: process.env.FORGOT_PASSWORD_ACTION_TOKEN || 'FPACS',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    MESSAGING_SERVICE_SID: process.env.MESSAGING_SERVICE_SID,

    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
}