const fetchfromTMDB  = require('../services/tmdbService')
async function getTrendingMovie(req, res) {
try {
    const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")   
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

    res.json({ success: true, content: randomMovie })
} catch (error) {
    res.status(500).json({ success: false, message: "Internal server error"})
}
}
module.exports  ={ getTrendingMovie}