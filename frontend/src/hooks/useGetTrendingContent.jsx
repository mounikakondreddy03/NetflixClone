import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
 
const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		};

		console.log("data:", getTrendingContent.res);
		console.log("contentType:", setTrendingContent);
		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};
export default useGetTrendingContent;
