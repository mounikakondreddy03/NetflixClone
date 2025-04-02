const mongoose = require('mongoose')
const envVars = require('./envVars')

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(envVars.MONGO_URI)
        console.log('MongoDB connected: ', connection.connection.host)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1);
    }
}

module.exports = connectDB;