const axios = require('axios')
require('dotenv').config()

const fetchfromTMDB = async (url) => {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    const response = await axios.get(url, options)
    // console.log(response,"response")
    if (response.status !== 200) 
        throw new Error("Failed to fetch data from TMDB" + response.statusText)

    return response.data
}

module.exports = fetchfromTMDB;