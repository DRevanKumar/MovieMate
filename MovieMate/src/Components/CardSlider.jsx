


import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../config";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { MoviesStateContext } from "./Moviecontext";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CardSlider() {
  <ToastContainer position="top-left" />
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {movies, setMovies} = useContext(MoviesStateContext);

  

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`${backend_Url}/movies`);
        if (Array.isArray(response.data)) {
          setMovies(response.data.reverse());
           
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.log("Error fetching post:",error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </motion.div>
  );

  const genreData = {
    Action : movies.filter(movie => movie.Genre.includes("Action")),
    Comedy: movies.filter(movie => movie.Genre.includes("Comedy")),
    Horror: movies.filter(movie => movie.Genre.includes("Horror")),
    Love: movies.filter(movie => movie.Genre.includes("Romance")),
    Family: movies.filter(movie => movie.Genre.includes("Family")),
    Thriller: movies.filter(movie => movie.Genre.includes("Thriller")),

    Other: movies.filter(movie => 
      !(
          movie.Genre.includes("Action") || 
          movie.Genre.includes("Comedy") || 
          movie.Genre.includes("Horror") || 
          movie.Genre.includes("Romance") || 
          movie.Genre.includes("Family")  ||
          movie.Genre.includes("Thriller")
      )
  )
  };

  return (
    <>
    <div>
      

    </div>
    <motion.div
    initial={{ opacity: 0, y: window.innerWidth < 768 ? 0 : 50 }}

      animate={{ opacity: 1 ,y:0}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-start  ml-3 lg:items-center w-full  min-h-screen pt-8 pb-5"
    >
      

      {Object.entries(genreData).map(([genre,movies]) => {
        if(movies.length===0) return null
        const filteredMovies = genreData[genre].reduce((acc, current) => {
          if (!acc.some((m) => m.Title.toLowerCase() === current.Title.toLowerCase())) {
            acc.push(current);
          }
          return acc;
        }, [])

        return (
          <motion.div 
            key={genre}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="my-5 w-full max-w-[100%] lg:max-w-[80%] overflow-hidden"
          >
            <h2 
  className="text-2xl lg:text-3xl md:text-3xl text-white font-bold mb-6 cursor-pointer flex items-center gap-2"
  onClick={() => navigate(`/genre/${genre === "Love" ? "Romance" : genre === "Other" ? "Other" : genre}`)}
>
  <span className="text-amber-600 text-3xl">|</span> 
  {genre} Movies
  <svg 
    width="24" 
    height="24" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-6 h-6 mt-1 text-white transition-transform duration-300 group-hover:translate-x-1"
    viewBox="0 0 24 24" 
    fill="currentColor" 
    role="presentation"
  >
    <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
  </svg>
</h2>

            <Swiper
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 25 },
                640: { slidesPerView: 3, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 25 },
              }}
              freeMode={true}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="mySwiper"
            >
              {filteredMovies.map((item) => (
                
                <SwiperSlide key={item._id}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-xl"
                    onClick={() => navigate(`/movie/${item.Title}`)}
                  >
                    <img 
                      src={item.Poster} 
                      className="w-full h-64 object-cover" 
                      alt={item.Title} 
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white truncate">{item.Title}</h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        );
      })}

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #CBD5E0;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #3B82F6;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #3B82F6;
          background:black;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: black;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
        }
      `}</style>
    </motion.div>
    </>
  );
}
