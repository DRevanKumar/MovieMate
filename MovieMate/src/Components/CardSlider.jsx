import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation"; // Import navigation styles
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import { Data } from "../Dummydta";

export default function CardSlider() {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full overflow-x-hidden">
      <Swiper
        breakpoints={{
          320: {  // Very small mobile screens
            slidesPerView: 2,
            spaceBetween: 50,  // Minimal gap for small screens
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
        navigation={true} // Enable navigation
        modules={[FreeMode, Pagination, Navigation]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {Data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-4 group relative shadow-lg rounded-xl h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover">
                <img src={item.img} className="h-full object-cover  w-9/12 md:w-10/12" alt={`Slide ${index + 1}`} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
