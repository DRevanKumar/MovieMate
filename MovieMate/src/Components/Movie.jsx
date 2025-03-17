<head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025"
    crossOrigin="anonymous"
  ></script>
</head>;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import axios from "axios";
import { backend_Url } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const user = localStorage.getItem('username');
const token = localStorage.getItem('token');


export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const[deleteLoader,setDeleteLoader] = useState(false)
  
  

  
   

  useEffect(() => {
    async function fetchPost() {
      let createdMovie;
      try {
        const response = await axios.get(`${backend_Url}/movies`);
        createdMovie = response.data.filter((movie) => movie.Title == id);
        setMovie(createdMovie);
        
      } catch (error) {
        toast.error("Error fetching post")
      } finally {
        setLoading(false);
      }

      
    }
    fetchPost();
    
  }, [id]);
       


 
       
         

    

    
    
  

  const navigateToPost=()=>{
    navigate('/addreview', { state: movie[0] });
  }

  

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!movie) return <div className="text-center mt-10">Movie not found</div>;
  return (
    <>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row  shadow-md rounded-lg p-6 mt-10 md:p-8"
      >
        <div className="md:w-1/3 mb-4 mt-10 md:mb-0">
          <img
            src={movie[0].Poster}
            alt={movie[0].Title}
            className="object-contain w-full h-48 md:h-96 rounded-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {movie[0].Title}
          </h1>
          <p className="text-lg text-white mb-2">
            <strong>Director:</strong> {movie[0].Director}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>Genre:</strong> {movie[0].Genre}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>Runtime:</strong> {movie[0].Runtime}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>OTT:</strong> {movie[0].Ott}
          </p>
          <p className="text-lg text-white mb-2">
            <strong>Family-Friendly:</strong> {movie[0].Family}
          </p>

          <h2 className="text-xl  text-white font-bold mb-2">Plot</h2>
          <p className=" text-white mb-2">{movie[0].Plot}</p>
          <p className="text-lg text-white mb-2"><strong>Shared By:</strong> {user}</p>


          <div className="p-2 -ml-2 md:p-2  md:-ml-2 rounded-lg shadow-md">
        <h2 className="text-xl md:text-xl font-bold text-white mb-4">
          Reviews
        </h2>
        


        {movie.map((m) => (
          <div
            key={m._id}
            className="mb-2 p-4 border border-gray-700 rounded-lg"
          >
            
            <p className="ml-4 md:ml-4 font-semibold text-white font-sans  ps-4">{m.YourReview}</p>
          </div>
        ))}
         
                <button onClick={navigateToPost}  
                className="bg-blue-600 ml-3 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                Add Review
                </button>
      </div>
          
          
        </div>
      </motion.div>
      

      
    </>
  );
}
