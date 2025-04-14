const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoute');
const movieRoutes = require('./routes/movieRoute');
const tvRoutes = require('./routes/tvRoute');
const searchRoute = require('./routes/searchRoute');

const envVars = require('./config/envVars');
const connectDB = require('./config/db');
const protectRoute = require('./middleware/protectRoute');

const app = express();
const PORT = envVars.PORT;

// app.use(cors());
var whitelist = ['http://locaalhost:5173/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoute);


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`); 
    connectDB();
});
