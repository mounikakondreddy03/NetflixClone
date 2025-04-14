// import { Info, Play } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import { Link } from "react-router-dom";
// import getTrendingContent from "../../hooks/getTrendingContent";
// import { TV_CATEGORIES, MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
// import { useContentStore } from "../../store/content";
// import MovieSlider from '../../components/MovieSlider'
// // import { useState } from "react";

// const HomeScreen = () => {
//   const { trendingContent } = getTrendingContent();
//   console.log("trendingContent", trendingContent);

//   const { contentType } = useContentStore();
//   console.log(contentType);
  
//   // const [imgLoading, setImgLoading] = useState(true);

//   // if( !trendingContent ) return (
//   //   <div className="h-screen text-white relative">
//   //     <Navbar />
//   //     <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
//   //   </div>
//   // )
  
//   return (
//     <>
//       <div className="relative h-screen text-white">
//         <Navbar />

//         {/* {imgLoading && (
//           <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
//         )} */}

//         <img src="/extraction.jpg" alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50"/>
//         {/* <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50" onClick={() => {setImgLoading(false)}}/> */}

//         <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden='true'></div>

//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">

//           <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

//           <div className="max-w-2xl">
//             <h1 className="mt-4 text-6xl font-extrabold text-balance"> Extraction</h1>
//             {/* <h1 className="mt-4 text-6xl font-extrabold text-balance"> {trendingContent?.title || trendingContent?.name }</h1> */}
//             <p className="mt-2 text-lg"> 2014 | 18+ </p>
//             {/* <p className="mt-2 text-lg"> {trendingContent?.release_date?.split("-")[10] || trendingContent?.first_air_date.spli("-")[0]} {" "} | { trendingContent?.adult ? "18+" : "PG-13"} </p>  */}

//             <p className="mt-4 text-lg">
//               Chirs Hemsworth stars in this nonstop action-thriller with Rudhraksh Jaiswal, Randeep Hooda and Golshifteh Farahani.
//             </p>
            
//             {/* <p className="mt-4 text-lg"> {trendingContent?.overview.length > 200 ? trendingContent?.overview.slice(0,200) + "..." : trendingContent?.overview}</p> */}
//           </div>

//           <div className="flex mt-8">
//             <Link to='/watch/123' className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
//             <Play className="size-6 mr-2 fill-black"/> Play </Link>

//             {/* <Link to={`/watch/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'><Play className="size-6 mr-2 fill-black"/> Play </Link>  */}

//             <Link to='/watch/123' className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'> <Info className="size-6 mr-2 fill-white"/> More Info </Link> 
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-10 bg-black py-10">
//         {contentType === "movie" ? ( 
//           MOVIE_CATEGORIES.map((category) => <MovieSlider key ={category} category={category} />)) : ( 
//             TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />))
//         }
//       </div>
//     </>
//   )
// }

// export default HomeScreen;



// import { Info, Play } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import { Link } from "react-router-dom";
// import getTrendingContent from "../../hooks/getTrendingContent";
// import { TV_CATEGORIES, MOVIE_CATEGORIES } from "../../utils/constants";
// import { useContentStore } from "../../store/content";
// import MovieSlider from '../../components/MovieSlider'

// const HomeScreen = () => {
//   const { trendingContent } = getTrendingContent();
//   console.log("trendingContent", trendingContent)

//   const { contentType } = useContentStore();
//   console.log('contenttype:',contentType);
  
//   const featured = trendingContent?.[0];
//   console.log("featured", featured)

//   return (
//     <>
//       <div className="relative h-screen text-white">
//         <Navbar />

//         {/* <img src="/extraction.jpg" alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50"/> */}

//         <img src={featured?.POSTER_PATH ?
//           `https://image.tmdb.org/t/p/original${featured.POSTER_PATH}` : '/extraction.jpg'} alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />

//         <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden='true' />

//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">

//           <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

//           <div className="max-w-2xl">
//             {/* <h1 className="mt-4 text-6xl font-extrabold text-balance"> Extraction</h1> */}
//             {/* <p className="mt-2 text-lg"> 2014 | 18+ </p> */}

//             <h1 className="mt-4 text-6xl font-extrabold text-balance"> { featured?.TITLE || 'Extraction' }</h1>

//             <p className="mt-2 text-lg"> { featured?.RELEASE_YEAR || '2014' }  | {" "} { featured?.AGE_RATING || '18+' } </p> 

//             {/* <p className="mt-4 text-lg">
//               Chirs Hemsworth stars in this nonstop action-thriller with Rudhraksh Jaiswal, Randeep Hooda and Golshifteh Farahani.
//             </p> */}
            
//             <p className="mt-4 text-lg"> { featured?.OVERVIEW 
//               ? featured.OVERVIEW.length > 200 
//               ? featured.OVERVIEW.slice(0, 200) + "..."
//               : featured.OVERVIEW
//               : "Chirs Hemsworth stars in the nonstop action-thriller."}</p>
//           </div>

//           <div className="flex mt-8">
//             {/* <Link to='/watch/123' className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'>
//             <Play className="size-6 mr-2 fill-black"/> Play </Link> */}

//             <Link to={`/watch/${featured?.ID || '123'}`}  className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'><Play className="size-6 mr-2 fill-black"/> Play </Link> 

//             {/* <Link to='/watch/123' className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'> <Info className="size-6 mr-2 fill-white"/> More Info </Link>  */}

//             <Link to={`/watch/${featured?.ID || '123'}`}  className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'> <Info className="size-6 mr-2 fill-white"/> More Info </Link> 
//           </div>
//         </div>
//       </div>

//       {/* sliders */}
//       <div className="flex flex-col gap-10 bg-black py-10">
//         {contentType === "movie" 
//         ? ( MOVIE_CATEGORIES.map((category) => <MovieSlider key ={category} category={category} />) ) 
//         : ( TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />) )
//         } 
//       </div>
//     </>
//   )
// }

// export default HomeScreen;


// import { Info, Play } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import { Link } from "react-router-dom";
// import getTrendingContent from "../../hooks/getTrendingContent";
// import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
// import { useContentStore } from "../../store/content";
// import MovieSlider from '../../components/MovieSlider'

// const HomeScreen = () => {
//   const { trendingContent } = getTrendingContent();
//   console.log("trendingContent", trendingContent)

//   const { contentType } = useContentStore();
//   console.log('contenttype:',contentType);

//   const title = trendingContent?.title || trendingContent?.name || "Title Unavailable";
//   const overview = trendingContent?.overview || "No description available.";
//   const releaseDate = trendingContent?.release_date || trendingContent?.first_air_date || "N/A";
//   const rating = trendingContent?.adult ? '18+' : 'PG-13';
//   const backdropPath = trendingContent?.backdrop_path;
  
  
//   return (
//     <>
//       <div className="relative h-screen text-white">
//         <Navbar />

//         <img src={ORIGINAL_IMG_BASE_URL + backdropPath} alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />

//         <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden='true' />

//         <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">

//           <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

//           <div className="max-w-2xl">
//             <h1 className="mt-4 text-6xl font-extrabold text-balance"> { title }</h1>

//             <p className="mt-2 text-lg"> { releaseDate.split("-")[0] } | { rating } </p> 
            
//             <p className="mt-4 text-lg"> { overview.length > 200 ? overview.slice(0, 200) + "...." : overview }</p>
//           </div>

//           <div className="flex mt-8">
           
//             <Link to={`/watch/${trendingContent?.id || 123}`}  className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'><Play className="size-6 mr-2 fill-black"/> Play </Link> 

//             <Link to={`/watch/${trendingContent?.id || 123}`}  className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'> <Info className="size-6 mr-2 fill-white"/> More Info </Link> 
//           </div>
//         </div>
//       </div>

//       {/* sliders */}
//       <div className="flex flex-col gap-10 bg-black py-10">
//         {contentType === "movie" 
//         ? ( MOVIE_CATEGORIES.map((category) => <MovieSlider key ={category} category={category} />) ) 
//         : ( TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />) )
//         } 
//       </div>
//     </>
//   )
// }

// export default HomeScreen;



import { Info, Play } from "lucide-react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import getTrendingContent from "../../hooks/getTrendingContent";
import { MOVIE_CATEGORIES, TV_CATEGORIES, ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from '../../components/MovieSlider'

const HomeScreen = () => {
  const { trendingContent } = getTrendingContent();
  console.log("trendingContent", trendingContent)

  const { contentType } = useContentStore();
  console.log('contenttype:',contentType);

  const title = trendingContent?.title || trendingContent?.name || "Title Unavailable";
  const overview = trendingContent?.overview || "No description available.";
  const releaseDate = trendingContent?.release_date || trendingContent?.first_air_date || "N/A";
  const rating = trendingContent?.adult ? '18+' : 'PG-13';
  const backdropPath = trendingContent?.backdrop_path;
  
  
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        <img src={ORIGINAL_IMG_BASE_URL + backdropPath} alt="Hero img" className="absolute top-0 left-0 w-full h-full object-cover -z-50" />

        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50" aria-hidden='true' />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">

          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance"> { title }</h1>

            <p className="mt-2 text-lg"> { releaseDate.split("-")[0] } | { rating } </p> 
            
            <p className="mt-4 text-lg"> { overview.length > 200 ? overview.slice(0, 200) + "...." : overview }</p>
          </div>

          <div className="flex mt-8">
           
            <Link to={`/watch/${trendingContent?.id || 123}`}  className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'><Play className="size-6 mr-2 fill-black"/> Play </Link> 

            <Link to={`/watch/${trendingContent?.id || 123}`}  className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'> <Info className="size-6 mr-2 fill-white"/> More Info </Link> 
          </div>
        </div>
      </div>

      {/* sliders */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie" 
        ? ( MOVIE_CATEGORIES.map((category) => <MovieSlider key ={category.id} category={category} />) ) 
        : ( TV_CATEGORIES.map((category) => <MovieSlider key={category.id} category={category} />) )
        } 
      </div>
    </>
  )
}

export default HomeScreen;