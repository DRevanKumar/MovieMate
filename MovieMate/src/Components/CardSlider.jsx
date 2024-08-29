import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { Data } from "../Dummydta";

export default function CardSlider() {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full overflow-x-hidden">
      <Swiper
        breakpoints={{
              320: {  // Very small mobile screens
                slidesPerView: 2,
                spaceBetween: 110,  // Minimal gap for small screens
              },
              626: {  // Slightly larger mobile screens
                slidesPerView: 2,
                spaceBetween: 40,
              },
              768: {  // Tablets and larger screens
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {Data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-4 group relative shadow-lg rounded-xl h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover">
                <img src={item.img} className="w-full h-full object-cover md:w-10/12" alt={`Slide ${index + 1}`} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
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
      `}</style>
    </div>
  );
}
