const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

process.env.MONGO_URI = "mongodb+srv://mounikakondreddy67:v5zkghjzchxGvgdI@cluster0.sdfaprk.mongodb.net/netflix_db?retryWrites=true&w=majority&appName=Cluster0";
process.env.JWT_SECRET = 10

const authRoutes = require('./routes/authRoute');
const envVars = require('./config/envVars');
const connectDB = require('./config/db');
const movieRoutes= require('./routes/movieRoute');

const app = express();
const PORT = envVars.PORT;
app.use(express.json())

console.log("MONGO_URI:", process.env.MONGO_URI);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', movieRoutes)

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});