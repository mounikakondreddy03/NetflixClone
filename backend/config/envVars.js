const dotenv = require('dotenv')
dotenv.config()

module.exports = ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5005,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
}