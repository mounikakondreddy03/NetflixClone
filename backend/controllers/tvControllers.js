const fetchfromTMDB = require('../services/tmdbService')

async function getTrendingTv(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")

        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(201).json({ success: true, content: randomMovie })
        console.log("trending tv data fetched successfully")
    } catch (error) {
        console.log('Error in trending movie:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getTvTrailers (req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.status(201).json({ success: true, trailers: data.results})
        console.log("tv trailers data fetched successfully")
    } catch (error) {
        if (error.message.includes("404")) 
            return res.status(404).send(null)

        console.log('Error in movie trailers:', error.message)
        res.status(500).json({ success: false, message: "Internal server error"})
        
    }
}

async function getTvDetails (req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(201).json({ success: true, content: data })
        console.log("tv details fetched successfully")
    } catch (error) {
     if (error.message.includes("404")) {
        return res.status(404).send(null)
     }

     console.log('Error in movie details:', error.message)
     res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`) 
        res.status(201).json({ success: true, content: data.results })
        console.log("Similar tv data fetched successfully")
    } catch (error) {
        console.log('Error in similar movies:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getTvByCategory (req, res) {
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(201).json({ success: true, content: data.results })
        console.log("Category trigged successfully")
    } catch (error) {
        console.log('Error in movie by category:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

module.exports = { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvByCategory}