// import { useEffect, useRef, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";

// const MovieSlider = ({ category}) => {
//     const { contentType } = useContentStore();
//     const [ content, setContent ] = useState([]);
//     const [showArrows, setShowArrows] = useState(false);

//     const sliderRef = useRef(null);

//     const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
//     const formattedCategoryType = contentType === "movie" ? "Movies" : "TV Shows";

//     useEffect(() => {
//         const getContent = async () => {
//             // const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/${category}`, { withCredentials: true });
//             const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/${category}`, { withCredentials: true });
//             // console.log('contenttype:', contentType)
//             // console.log('category:', category);
//             // console.log('res:', res)
//             console.log(contentType, category,"res:", res)
//             setContent(res.data.content)
//         } 
//         getContent();
//     }, [contentType, category]);

//     const scrollLeft = () => {
//         if(sliderRef.current) {
//             sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
//         }
//     }
//     const scrollRight = () => {
//         sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
//     } 

//     return (
//         <div className="bg-black text-white relative px-5 md:px-20" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}> 
//             <h2 className="mb-4 text-2xl font-bold"> { formattedCategoryName } { formattedCategoryType } </h2>

//             <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
//                 {content.map((item) => {
//                     <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
//                         <div className="rounded-lg overflow-hidden">
//                             <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="Movie image" className="transition-transform duration-300 ease-in-out group-hover:scale-125"/>
//                         </div>
//                         <p className="mt-2 text-center"> { item.title || item.name }</p> 
//                     </Link>
//                 })}
//             </div>

//             {showArrows && (
//                 <>
//                     <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollLeft}> <ChevronLeft size={24} /> </button>

//                     <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollRight}> <ChevronRight size={24} /> </button>
//                 </>
//             )}
//         </div> 
//     )
// }

// export default MovieSlider;

// import { useEffect, useRef, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";

// const MovieSlider = ({ category }) => {
//     const { contentType } = useContentStore();
//     const [ content, setContent ] = useState([]);
//     const [showArrows, setShowArrows] = useState(false);
    
//     const sliderRef = useRef(null);

//     const formattedCategoryName = category.replace("_", " ");
//     console.log('formattedCategoryName:', formattedCategoryName)

//     const capitalizedCategoryName = formattedCategoryName.chartAt(0).toUpperCase() + formattedCategoryName.slice(1);
//     console.log('capitalizedCategoryName:', capitalizedCategoryName)
    
//     const formattedCategoryType = contentType === "movie" ? "Movies" : "TV Shows";
//     console.log('formattedCategoryType:', formattedCategoryType)

//     useEffect(() => {
//         const getContent = async () => {
//             const res = await axios.get(`https://netflixclone-vrof.onrender.com/api/v1/${contentType}/${category}`, { withCredentials: true });
//             setContent(res.data.content || []);
//             console.log('res:', res)
//         } 
//         getContent();
//     }, [contentType, category]);

//     const scrollLeft = () => {
//         if(sliderRef.current) {
//             sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
//         }
//     }
//     const scrollRight = () => {
//         sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
//     } 

//     return (
//         <div className="bg-black text-white relative px-5 md:px-20" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}> 
//             <h2 className="mb-4 text-2xl font-bold"> { capitalizedCategoryName } { formattedCategoryType } </h2>

//             <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
//                 {content.map((item) => {
//                     <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
//                         <div className="rounded-lg overflow-hidden">
//                             <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt={ item.title || item.name } className="transition-transform duration-300 ease-in-out group-hover:scale-125"/>
//                         </div>
//                         <p className="mt-2 text-center"> { item.title || item.name }</p> 
//                     </Link>
//                 })}
//             </div>

//             {showArrows && (
//                 <>
//                     <button className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollLeft}> <ChevronLeft size={24} /> </button>

//                     <button className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10" onClick={scrollRight}> <ChevronRight size={24} /> </button>
//                 </>
//             )}
//         </div> 
//     )
// }

// export default MovieSlider;


import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SMALL_IMG_BASE_URL } from '../utils/constants';

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/movie/`, {
          withCredentials: true,
        });
        setContent(res.data.content);
      } catch (error) {
        console.error(`Error fetching ${category.label}:`, error);
      }
    };
    getContent();
  }, [contentType, category.id]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {category.label} {contentType === "movie" ? "Movies" : "TV Shows"}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt={item.title || item.name}
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
