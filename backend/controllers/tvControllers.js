// const fetchfromTMDB = require('../services/tmdbService')

// async function getTrendingTv(req, res) {
//     try {
//         const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")

//         const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
//         res.status(201).json({ success: true, content: randomMovie })
//         console.log("trending tv data fetched successfully")
//     } catch (error) {
//         console.log('Error in trending movie:', error.message)
//         res.status(500).json({ success: false, message: "Internal server error" })
//     }
// }

// async function getTvTrailers (req, res) {
//     const { id } = req.params;
//     try {
//         const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
//         res.status(201).json({ success: true, trailers: data.results})
//         console.log("tv trailers data fetched successfully")
//     } catch (error) {
//         if (error.message.includes("404")) 
//             return res.status(404).send(null)

//         console.log('Error in movie trailers:', error.message)
//         res.status(500).json({ success: false, message: "Internal server error"})
        
//     }
// }

// async function getTvDetails (req, res) {
//     const { id } = req.params;
//     try {
//         const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
//         res.status(201).json({ success: true, content: data })
//         console.log("tv details fetched successfully")
//     } catch (error) {
//      if (error.message.includes("404")) {
//         return res.status(404).send(null)
//      }

//      console.log('Error in movie details:', error.message)
//      res.status(500).json({ success: false, message: "Internal server error" })
//     }
// }

// async function getSimilarTvs(req, res) {
//     const { id } = req.params;
//     try {
//         const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`) 
//         res.status(201).json({ success: true, content: data.results })
//         console.log("Similar tv data fetched successfully")
//     } catch (error) {
//         console.log('Error in similar movies:', error.message)
//         res.status(500).json({ success: false, message: "Internal server error" })
//     }
// }

// async function getTvByCategory (req, res) {
//     const { category } = req.params;
//     try {
//         const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
//         res.status(201).json({ success: true, content: data.results })
//         console.log("Category trigged successfully")
//     } catch (error) {
//         console.log('Error in movie by category:', error.message)
//         res.status(500).json({ success: false, message: "Internal server error" })
//     }
// }

// module.exports = { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs, getTvByCategory}


const xlsx = require('xlsx');
const path = require('path');

const tvPath = path.join(__dirname, '../archive/Book1.xlsx');
const workbook = xlsx.readFile(tvPath);
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const tvData = data.map(tv =>{
    const { id, name, number_of_seasons, nunumber_of_episodes, original_language, overview, first_air_date, last_air_date, original_name, poster_path, ...rest } = tv;

    return {
        id: id || null,
        name: name || null,
        number_of_seasons: number_of_seasons || null,
        number_of_episodes: nunumber_of_episodes || null,
        original_language: original_language || null,
        overview: overview || null,
        first_air_date: first_air_date || null,
        last_air_date: last_air_date || null,
        original_name: original_name || null,
        image: poster_path ? 'https://image.tmdb.org/t/p/w500' + poster_path : null,
        ...rest
    }
})

// console.log('TV data: ', tvData)
console.log('TV data length: ', tvData.length)
console.log('TV data: ', tvData[0])
console.log('TV data: ', tvData[1])

async function getTrendingTv(req, res) {
    try {
        const randomTv = tvData[Math.floor(Math.random() * tvData.length)];
        res.status(200).json({ status: 'success', content: randomTv });
        console.log('Random Tv:', randomTv);
    } catch (error) {
        console.error('Error in getTrendingTv:', error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const tv = tvData.find(tv => String(tv.id) === id);
        if (!tv) {
            return res.status(404).json({ success: false, message: "TV Series not found" });
        }

        res.status(200).json({ success: true, trailers: data.results})
        console.log("tv trailers data fetched successfully")
    } catch (error) {
        console.log('Error in movie trailers:', error.message)
        res.status(500).json({ success: false, message: "Internal server error"})
        
    }
}

async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const tv = tvData.find(tv => String(tv.id) === id);
        if (!tv) {
            return res.status(404).json({ success: false, message: "TV Series not found" });
        }

        res.status(200).json({ success: true, content: tv });
        console.log("tv details fetched successfully")
    } catch (error) {
        console.log('Error in movie details:', error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const tvEntries = tvData.filter(item => String(item.id) === id);

        if (tvEntries.length === 0) {
            return res.status(404).json({ success: false, message: "TV Series not found" });
        }

        const similarTvs = tvEntries.map(entry => {
            return tvData.find(tv => String(tv.id) === String(entry.similarId));
        }).filter(Boolean);
        
        console.log('Similar TV data length: ', similarTvs.length)
        res.status(200).json({ success: true, similarTvs: similarTvs });
    } catch (error) {
        console.error('Error in getSimilarTvs:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports = { getTrendingTv, getTvTrailers, getTvDetails, getSimilarTvs };