import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoviesStateContext } from './Moviecontext';

export default function Search() {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState("Movies By");
        const navigate = useNavigate();
        const [searchTerm, setSearchTerm] = useState("");
        const [filteredMovie, setFilteredMovie] = useState(false);
        const { movies } = useContext(MoviesStateContext);
        const debouncevalue=useDebounce(searchTerm,500)

      
        const toggleDropdown = () => {
          setIsOpen(!isOpen);
        };
      
        const handleItemClick = (item) => {
            setSelectedItem(item)
          navigate(`/moviesByReviewer/${item}`)
          setIsOpen(false);
        };

        const options = ["Revan", "Sumanth", "Guna","Bharath","Varun","John"];

      
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
          className="relative right-9 p-2 text-white rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.button>

    <div className="relative right-1 text-center">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex justify-enter w-max rounded-md border border-gray-300  bg-gray-700 shadow-sm px-4 py-2  text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {selectedItem}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                value={option}
                onClick={() => handleItemClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  


    
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
