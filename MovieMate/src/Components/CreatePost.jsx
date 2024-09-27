import axios from 'axios';
import React,  {useState} from 'react';
import { backend_Url } from '../config';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';




const API1 = import.meta.env.VITE_API_KEY;
const API2 = import.meta.env.VITE_API_KEY1




function CreatePost() {
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [hideForm, setHideForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMovie,setSelectedMovie]= useState({})
    const [yourReview,setYourReview] = useState('')
    const [shared,setShared] = useState('')
    const[ott,setOtt]= useState('')
    const [family,setFamily] = useState('')
    const [loading,setLoading]= useState(false)
  
    

    const getApi=()=>{
      const keys=[API1,API2]
      return keys[Math.floor(Math.random()*keys.length)];
    }


    
  
    



    const handleMovieClick = (imdbID) =>{
        setHideForm(!hideForm);
        getMovieById(imdbID)
    }
    const getMovieById = async (imdbID) =>{
        try {
            const API= getApi();
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API}&i=${imdbID}`);
            const data = await response.json();
            setSelectedMovie(data);
          } catch (error) {
            console.error('Error fetching the movie data');
          }
    }
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const API=getApi();

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API}&s=${searchTerm}`);
        const data = await response.json();
        setMovies(data.Search || []);
        setHideForm(true);
      } catch (error) {
        console.error('Error fetching the movie data');
      } finally {
        setIsLoading(false);
      }
    }

    async function HandlePost() {
      setLoading(!loading)
      const postData = {
          Title: selectedMovie.Title,
          Poster: selectedMovie.Poster,
          Director: selectedMovie.Director,
          Genre: selectedMovie.Genre,
          Runtime: selectedMovie.Runtime,
          Plot: selectedMovie.Plot,
          YourReview: yourReview,
          SharedBy: shared,
          Ott: ott,
          Family: family,
      };
  
  
      try {
          const response = await axios.post(`${backend_Url}/createpost`, postData, {
              headers: {
                  Authorization: localStorage.getItem('token'),
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.status === 200) {
              const id = response.data._id;
              setLoading(!loading)

                navigate(`/post/${id}`);
          }
      } catch (e) {
          console.log("Error during post:", e);
      }
  }
  
  const handlekeypress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center mt-48 top-1/2"
    >
      <div className="animate-spin top-1/2 mt-48 rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </motion.div>
  );
  

  return (
    <div  className="min-h-fit mt-64 flex items-center justify-center ">
      <div className=" min-h-fit w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-4">Create Post</h1>
        <p className="text-center text-black-700 mb-6 font-semibold italic font-poppins">Share Great Movies With your friends</p>

        <div className="mb-4 flex">
          <input 
            type="text" 
            onKeyDown={handlekeypress}
            placeholder="Search movie to share"     
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="w-full p-2 border border-black-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <button 
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-black-600 transition">
            Search
          </button>
        </div>
        {isLoading && <p className="text-center">Loading...</p>}
        {hideForm && <div className=" min-h-fit overflow-hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} onClick={()=>handleMovieClick(movie.imdbID)} className="bg-gray-100 p-4 rounded-lg shadow-md z-1 cursor-pointer">
              <img 
                src={`${movie.Poster}`} 
                alt={movie.title} 
                className="w-full h-48 object-top"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-700 mt-1">Release Date: {movie.Year}</p>
            </div>
          ))}
        </div>}

        {!hideForm && <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="w-full  bg-black-100 border border-black-300 rounded-lg flex items-center justify-center">
              <img src={selectedMovie?.Poster} alt='poster.jpg'></img>
            </div>
          </div>
          <div className="w-full md:w-2/3 md:ml-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                type="text" 
                value={selectedMovie?.Title || ''}
                disabled
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Director</label>
              <input 
                type="text" 
                value={selectedMovie?.Director || ''}
                disabled
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <input 
                type="text" 
                value={selectedMovie?.Genre || ''}
                disabled
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Runtime</label>
              <input 
                type="text" 
                value={selectedMovie?.Runtime || ''}
                disabled
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Plot Line</label>
              <textarea 
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                rows="3"
                value={selectedMovie?.Plot || ''}
                disabled
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Your Review</label>
              
              <textarea 
                value={yourReview}
                onChange={e=> setYourReview(e.target.value)}
                className="overflow-scroll w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                rows="3"
                

              ></textarea>
            </div>
           
      <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Shared By</label>
              <input 
                type="text" 
                onChange={e=> setShared(e.target.value)}
                value={shared}
                className="w-full p-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ott Platforms</label>
              
              <input
                value={ott}          
                onChange={e => setOtt(e.target.value)}
                type="text" 
                className="w-full p-2 border border-black-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="mb-4">
              
              <label className="block text-sm font-medium text-gray-700">Family-Friendly</label>
              <input
                value={family} 
                onChange={e=> setFamily(e.target.value)}
                type="text" 
                className="w-full p-2 border border-black-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
          </div>
        </div>}

        {!hideForm && <button onClick={HandlePost} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-black-600 transition">
          Post
        </button>}
      </div>
    </div>
    
    
  );
}

export default CreatePost;