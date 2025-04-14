// import { useState, useEffect } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";

// const useGetTrendingContent = () => {
// 	const [trendingContent, setTrendingContent] = useState(null);
// 	const { contentType } = useContentStore();
// 	// console.log(contentType, )

// 	useEffect(() => {
// 		const getTrendingContent = async () => {
// 			try {
// 				const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/now_playing`, { withCredentials: true });
// 				// const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/trending`, { withCredentials: true });
// 				console.log("Trending content:", res);
// 				console.log("Trending content:", res.data.content);
// 				setTrendingContent(res.data.content);
// 			} catch (error) {
// 				console.error("Error fetching trending content:", error);
// 			}
// 		};

// 		getTrendingContent();
// 	}, [contentType]);

// 	return { trendingContent };
// };

// export default useGetTrendingContent;


// without contenttype
// import { useState, useEffect } from "react";

// const useGetTrendingContent = () => {
// 	const [trendingContent, setTrendingContent] = useState(null);

// 	useEffect(() => {
// 		const getTrendingContent = async () => {
// 			try {
// 				const response = await fetch('http://localhost:5000/movies');
// 				const data = await response.json();
// 				console.log("Trending content:", data);
// 				setTrendingContent(data);
// 			} catch (error) {
// 				console.error("Error fetching trending content:", error);
// 			}
// 		};

// 		getTrendingContent();
// 	}, []);

// 	return { trendingContent };
// };

// export default useGetTrendingContent;


// with contenttype

import { useState, useEffect } from "react";
import { useContentStore } from "../store/content";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType} = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			try {
				const response = await fetch('http://localhost:5000/movies');
				const data = await response.json();

				const filteredData = data.filter((item) => item.MEDIA_TYPE?.toLowerCase() === contentType.toLowerCase());
				console.log("Filtered data:", filteredData);
				setTrendingContent(filteredData);
			} catch (error) {
				console.error("Error fetching trending content:", error);
			}
		}
		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
}

export default useGetTrendingContent;