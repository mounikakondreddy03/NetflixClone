const fetchfromRapidAPI = require('../services/tmdbService')
const generateTokenAndSetCookie = require('../utils/generateToken')

async function getTrendingMovie (req, res) {
    try {
        const data = await fetchfromRapidAPI('https://moviedatabase.p.rapidapi.com/titles/x/upcoming')

        const res = data.results || []
        const randomMovie = res[Math.floor(Math.random() * res.length)]

        res.status(200).json({ status: 'success', content: randomMovie })
        console.log("Random Movie: ", randomMovie)
        console.log('trending movie data fetched successfully')
    } catch (error) {
        console.log('Error in getTrendingMovie: ', error)
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
    }
}

async function getMovieTrailers (req, res) {
    const { id } = req.params;

    try {
        const data = await fetchfromRapidAPI(`https://moviedatabase.p.rapidapi.com/titles/${id}/trailers`)
        console.log('data: ', data)
        res.status(200).json({ success: true, content: data.results || []})
        console.log('trailers data fetched successfully')
    } catch (error) {
        console.log('Error in getMovieTrailers: ', error)
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
        
    }
}

async function getMovieDetails (req, res) {
    const { id } = req.params;

    try {
        const data = await fetchfromRapidAPI(`https://moviedatabase.p.rapidapi.com/titles/${id}`)
        
        res.status(200).json({ success: true, content: data.results}) 
        console.log('movie details data fetched successfully')
    } catch (error) {
        if (error.message && error.message.includes('404')) {
            return res.status(404).send(null)
        }

        console.log('Error in getMovieDetails: ', error)
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
    }
}

async function getSimilarMovies (req, res) {
    const { id } = req.params;

    try {
        const data = await fetchfromRapidAPI(`https://moviedatabase.p.rapidapi.com/titles/${id}/similar`)
        
        res.status(200).json({ success: true, content: data.results || []})
        console.log('similar movies data fetched successfully')
    } catch (error) {
        console.log('Error in getSimilarMovies: ', error)
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
        
    }
}

async function getMovieByCategory (req, res) {
    const { category } = req.params;

    try{
        let endpoint;
        switch(category) {
            case 'popular':
                endpoint = 'https://moviedatabase.p.rapidapi.com/titles/x/upcoming'
                break;
            case 'top-rated':
                endpoint = 'https://moviedatabase.p.rapidapi.com/titles/x/top-rated'
                break;
            case 'now_playing':
                endpoint = 'https://moviedatabase.p.rapidapi.com/titles/x/now-playing';
                break;
            default:
                endpoint = `https://moviedatabase.p.rapidapi.com/titlessearch/genre/${category}`;
        }


        const data = await fetchfromRapidAPI(endpoint)
        res.status(200).json({ success: true, content: data.results || [] })
        console.log('category data fetched successfully')
    } catch (error) {
        console.log('Error in movie by category: ', error)
        res.status(500).json({ status: 'error', message: "Internal Server Error" })
    }
}
module.exports = { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMovieByCategory }