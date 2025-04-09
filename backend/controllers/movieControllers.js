const fetchfromTMDB = require('../services/tmdbService')
const generateTokenAndSetCookie = require('../utils/generateToken')

async function getTrendingMovie(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        const token = generateTokenAndSetCookie(user._id, res)
        
        res.status(201).json({ success: true, content: randomMovie, token})
        console.log("trending movie data fetched successfully")
    } catch (error) {
        console.log('Error in trending movie:', error.message) 
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getMovieTrailers (req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.status(201).json({ success: true, trailers: data.results})
        console.log("trailers data fetched successfully")
    } catch (error) {
        if (error.message.includes("404")) 
            return res.status(404).send(null)

        console.log('Error in movie trailers:', error.message)
        res.status(500).json({ success: false, message: "Internal server error"})
        
    }
}

async function getMovieDetails (req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(201).json({ success: true, content: data })
        console.log("movie details fetched successfully")
    } catch (error) {
     if (error.message.includes("404")) {
        return res.status(404).send(null)
     }

     console.log('Error in movie details:', error.message)
     res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`) 
        res.status(201).json({ success: true, content: data.results })
        console.log("Similar movies data fetched successfully")
    } catch (error) {
        console.log('Error in similar movies:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getMovieByCategory (req, res) {
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(201).json({ success: true, content: data.results })
        console.log("Category trigged successfully")
    } catch (error) {
        console.log('Error in movie by category:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

module.exports = { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies, getMovieByCategory}