import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from 'axios';
import { backend_Url } from "../config";
import { useNavigate } from "react-router-dom";

export default function CardSlider() {
  const navigate = useNavigate();
  const[searchTerm,setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  async function handleClick(id){
    console.log(id)

  }

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`${backend_Url}/movies`);
        console.log("Fetched Movies:", response.data);
        if (Array.isArray(response.data)) {
          setMovies(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.log("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const genreData = {
    Action: movies.filter(movie => movie.Genre.includes("Action")),
    Comedy: movies.filter(movie => movie.Genre.includes("Comedy")),
    Drama: movies.filter(movie => movie.Genre.includes("Drama")),
    Mystery: movies.filter(movie => movie.Genre.includes("Mystery")),
  };

  return (
    <div className="flex flex-col items-center w-full">

        <div className="mb-4 flex justify-center ">
          <input 
            type="text" 
            placeholder="Search movie"     
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-96 p-2 border border-black-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <button 
            // onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-black-600 transition">
            Search
          </button>
        </div>
      {Object.keys(genreData).map((genre) => {
        const filteredMovies = genreData[genre];

        return (
          
          

          <div key={genre} className="my-10 w-full max-w-[90%] lg:max-w-[80%] overflow-hidden">
           
            <h2 className="text-2xl text-orange-500 font-bold mb-4">{genre} Movies</h2>
            <div>
              <Swiper
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  626: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[FreeMode, Pagination, Navigation]}
                className="mySwiper"
              >
                {filteredMovies.map((item, index) => (
                  <SwiperSlide key={item._id} className="flex justify-center">
                    <div className="flex flex-col gap-4   group  shadow-lg rounded-xl  w-full lg:h-[400px] lg:w-full overflow-hidden cursor-pointer">
                      <div className=" ">
                        <img 
                          onClick={() => navigate(`/post/${item._id}`)}                          
                          src={item.Poster} 
                          className="h-full object-cover w-full" 
                          alt={`Slide ${index + 1}`} 
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}

      {/* Custom Pagination and Navigation Styling */}
      <style jsx>{`
        .swiper-pagination-bullets {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          padding: 10px;
          border-radius: 10px;
        }
        .swiper-pagination-bullet {
          background: white; /* Custom bullet color */
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: blue; /* Active bullet color */
        }
        .swiper-button-prev {
          left: 5px; /* Adjust this value to move the button further left */
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white; /* Button color */
          width: 40px; /* Button size */
          height: 40px; /* Button size */
          border-radius: 50%; /* Rounded button */
          background: rgba(0, 0, 0, 1); /* Semi-transparent background */
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 25px; /* Icon size */
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 1.5); /* Darker background on hover */
        }
      `}</style>
    </div>
  );
}
