const XLSX = require('xlsx');
const path = require('path');

const movieExcelPath = path.join(__dirname, '../archive/MOVIE.xlsx');
const workbook = XLSX.readFile(movieExcelPath);
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

const similarMovie = path.join(__dirname, '../archive/MOVIE_SIMILAR.xlsx');
const workbook1 = XLSX.readFile(similarMovie);
const sheetName1 = workbook1.SheetNames[0];
const similarData = XLSX.utils.sheet_to_json(workbook1.Sheets[sheetName1]);

const movieData = data.map(movie => {
    const { FILMID, TITLE, GENRE, CATEGORY, TRAILERS, POSTER_PATH, ...rest} = movie;

    return {
        id: FILMID || movie.ID || null,
        title: TITLE || null,
        genre: GENRE || null,
        category: CATEGORY || null,
        trailers: TRAILERS ? JSON.parse(TRAILERS) : [],
        image: POSTER_PATH ? 'https://image.tmdb.org/t/p/w500' + POSTER_PATH : null,
        ...rest
    }
})

const similarMovieData = similarData.map(similarMovies => {
    const { FILMID, SIMILAR_FILMID, SIMILAR_TITLE,SIMILAR_ORIGINAL_TITLE, SIMILAR_ORIGINAL_LANGUAGE } = similarMovies;

    return {
        id: FILMID || null,
        similarId: SIMILAR_FILMID || null,
        similarTitle: SIMILAR_TITLE || null,
        similarOriginalTitle: SIMILAR_ORIGINAL_TITLE || null,
        similarOriginalLanguage: SIMILAR_ORIGINAL_LANGUAGE || null,
    }
})

// console.log('Movie data: ', movieData)
console.log('Movie data length: ', movieData.length)
console.log('Movie data: ', movieData[0])
console.log('similar movie data length: ', similarMovieData.length)
console.log('similar movie:', similarMovieData[0]);


async function getTrendingMovie(req, res) {
    try {
        const randomMovie = movieData[Math.floor(Math.random() * movieData.length)];
        res.status(200).json({ status: 'success', content: randomMovie });
        console.log("Random Movie: ", randomMovie);
    } catch (error) {
        console.error('Error in getTrendingMovie:', error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
        const movie = movieData.find(movie => String(movie.id) === id);
        if (!movie) {
            return res.status(404).json({ status: 'error', message: 'Movie not found' });
        }

        res.status(200).json({ success: true, content: movie.trailers || [] });
    } catch (error) {
        console.error('Error in getMovieTrailers:', error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const movie = movieData.find(movie => String(movie.id) === id);
        if (!movie) {
            return res.status(404).json({ status: 'error', message: 'Movie not found' });
        }

        const similarEntries = similarMovieData.filter(item => String(item.id) === id);

        const similarMovies = similarEntries.map(entry => {
            return movieData.find(m => String(m.id) === String(entry.similarId));
        }).filter(Boolean);

        const moviewithSmiliar = {
            ...movie,
            similarMovies,
        };

        res.status(200).json({ success: true, content: moviewithSmiliar });
    } catch (error) {
        console.error('Error in getMovieDetails:', error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const similarEntries = similarMovieData.filter(item => String(item.id) === id);

        if (similarEntries.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No similar movies found' });
        }

        const similarMovies = similarEntries.map(entry => {
            return movieData.find(movie => String(movie.id) === String(entry.similarId));
        }).filter(Boolean);
        console.log(`similar movies for ID ${id}: `, similarMovies)

        res.status(200).json({ success: true, content: similarMovies });
    } catch (error) {
        console.error('Error in getSimilarMovies:', error);
        res.status(500).json({ status: 'error', message: "Internal Server Error" });
    }
}

// async function getMovieByCategory(req, res) {
//     const { category } = req.params;
//     try {
//         const filteredMovies = movieData.filter(movie => movie.category === category);
//         res.status(200).json({ success: true, content: filteredMovies });
//     } catch (error) {
//         console.error('Error in getMovieByCategory:', error);
//         res.status(500).json({ status: 'error', message: "Internal Server Error" });
//     }
// }

module.exports = { getTrendingMovie, getMovieTrailers, getMovieDetails, getSimilarMovies };