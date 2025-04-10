const axios = require('axios')
require('dotenv').config()

const fetchfromTMDB = async (url) => {
    const options = {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
        }
    };
    
    const response = await axios.get(url, options)
    console.log(response,"response")
    if (response.status !== 200) 
        throw new Error("Failed to fetch data from TMDB" + response.statusText)

    return response.data
}

module.exports = fetchfromTMDB;


// const axios = require('axios')
// require('dotenv').config()

// const fetchfromRapidAPI = async (url) => {
//     const options = {
//         headers: {
//             'x-rapidapi-key': '81c8c21ee4msh57ab6be4855c93dp16e26ajsn99e89855d03c',
// 		    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await axios.get(url, options)
//         if (response.status !== 200) 
//             throw new Error("Failed to fetch data from TMDB" + response.statusText)
    
//         return response.data
//     } catch (error) {
//         if(error.response)
//             throw new Error(`RapidAPI request failed: ${error.response.status} - ${error.response.statusText}`)
//         else 
//             throw new Error(`RapidAPI request failed: ${error.message}`)
//     }
//     // console.log(response,"response")
// }

// module.exports = fetchfromRapidAPI;