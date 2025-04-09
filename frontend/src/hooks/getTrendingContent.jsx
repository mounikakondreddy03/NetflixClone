
import { useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

		const getTrendingContent = async () => {
			try {
				// const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/trending`, { withCredentials: true } );
				const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/trending`, { withCredentials: true });
				console.log("trending content", res.data.content);
				setTrendingContent(res.data.content);
			} catch (error) {
				console.error("Error fetching trending content:", error);
			}
		};

		getTrendingContent();

	return { trendingContent };
};

export default useGetTrendingContent;