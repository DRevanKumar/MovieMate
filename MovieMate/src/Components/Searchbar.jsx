import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoviesStateContext } from './Moviecontext';

export default function Search() {
    function useDebounce(value,delay){
        const[debouncevalue,setDebouncevalue] = useState('');
      
        useEffect(()=>{
          const t= setTimeout(()=>{
            setDebouncevalue(value)
              
            }
          ,delay)
          return ( )=>{
            clearTimeout(t)
          }
        },[value,delay])
        return debouncevalue;
      }
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovie, setFilteredMovie] = useState(false);
  const { movies } = useContext(MoviesStateContext);
  const debouncevalue=useDebounce(searchTerm,500)

  const filteredMovies = debouncevalue.length > 0 
  ? Object.values(movies).filter(movie => 
      movie.Title.toLowerCase().includes(debouncevalue.toLowerCase())
    )
  : [];



 

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleClick = () => {
    if (searchTerm.length != 0) {
      setFilteredMovie(!filteredMovie);
     
    }
  };

  return (
    <div className="absolute flex flex-col items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative flex items-center justify-between w-full">
        <AnimatePresence>
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            type="text"
            onKeyDown={handleKeyPress}
            placeholder="Search movie"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-sm border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="absolute right-1 p-2 text-white rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {filteredMovie && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute transform -translate-x-1/2 w-full bg-gray-800 z-50 rounded mt-11 p-4"
          >
            <div className="flex justify-between items-center p-2">
              <h2 className="text-white">Results:</h2>
              <button onClick={() => setFilteredMovie(false)} className="text-white ">
                <ion-icon name="close-circle-outline" className="text-3xl p-2"></ion-icon>
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {filteredMovies.map((movie) => (
                <div key={movie.Title} className="bg-gray-100 flex flex-col items-center shadow-md cursor-pointer w-32">
                  <img
                    src={`${movie.Poster}`}
                    alt={movie.Title}
                    className="w-full h-40 object-cover"
                    onClick={() => navigate(`/post/${movie._id}`)}
                  />
                  <p 
                    onClick={() => navigate(`/post/${movie._id}`)} 
                    className="flex text-lg font-semibold mt-2 justify-center text-center"
                  >
                    {movie.Title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
