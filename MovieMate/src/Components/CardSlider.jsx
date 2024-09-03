import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Navigation, FreeMode, Pagination } from "swiper/modules";
import { Data } from "../Dummydta";
import React,  {useState} from 'react';

export default function CardSlider() {
  return (
    <div>
       <div>
          <h4 className=" m-5 text-white font-bold italic font-poppins md:ml-[135px]">Top Rated</h4>
        </div>
    
    <div className="flex items-center justify-center flex-col h-full w-full overflow-x-hidden">
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 60,
          },
          626: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {Data.map((item, index) => (
          <SwiperSlide key={index}> 
            <div className="flex flex-col gap-4 group relative shadow-lg rounded-xl h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <img
                src={item.Poster}
                className="w-10/12 h-full object-fill"
                alt={item.Title}    
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style>
        {`
        .swiper-button-next,
        .swiper-button-prev {
          color: white; /* Change navigation button color to red */ 
        }
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

      `}
      </style>
    </div>
    </div>
  );
}
