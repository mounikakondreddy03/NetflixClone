const User = require("../models/userModel")
const fetchfromTMDB = require("../services/tmdbService")

async function searchPerson(req, res) {
    const { query } = req.params
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length === 0)
            res.status(404).send(null)

        await User.findByIdAndUpdate(req.user_id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    serachType: "person",
                    createdAt: new Date(),
                }
            }
        })
        
        console.log("search person is triggredd...")
        res.status(200).json({ success: true, content: response.results})
    } catch (error) {
        console.log("Error in searchPerson controller:", error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length === 0) 
            return res.status(404).send(null)

        await User.findByIdAndUpdate(req.user_id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    serachType: "tv",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in searchMovie controller:", error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchfromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length === 0) 
            return res.status(404).send(null)

        await User.findByIdAndUpdate(req.user_id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    serachType: "movie",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in searchMovie controller:", error.message);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}

async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error"});
    }
}

async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            }
        })

        res.status(200).json({ success: true, message: "Item removed from search history"})
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller:", error.messsge); 
        res.status(500).json({ success: false, message: "Internal server error"});
    }
}

module.exports = { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory }