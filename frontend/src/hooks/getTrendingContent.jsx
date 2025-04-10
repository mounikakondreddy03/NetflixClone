import { useState, useEffect } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();
	// console.log(contentType, )

	useEffect(() => {
		const getTrendingContent = async () => {
			try {
				const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/now_playing`, { withCredentials: true });
				// const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/trending`, { withCredentials: true });
				console.log("Trending content:", res);
				console.log("Trending content:", res.data.content);
				setTrendingContent(res.data.content);
			} catch (error) {
				console.error("Error fetching trending content:", error);
			}
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};

export default useGetTrendingContent;
