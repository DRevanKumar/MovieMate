import { useLocation,useNavigate } from "react-router-dom"
import React, { useState } from "react";
import { motion } from 'framer-motion';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { backend_Url } from "../config";




export default function AddReview () {
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedMovie,setSelectedMovie]= useState({})

    const [yourReview, setYourReview] = useState('')
    const username= localStorage.getItem('username')
    useEffect(() => {
        if (location.state && Object.keys(location.state).length > 0) {
            setSelectedMovie(location.state);
        }
    }, [location.state]); 

    async function HandlePost() {
        
        const postData = {
            Title: selectedMovie.Title,
            Poster: selectedMovie.Poster,
            Director: selectedMovie.Director,
            Genre: selectedMovie.Genre,
            Runtime: selectedMovie.Runtime,
            Plot: selectedMovie.Plot,
            YourReview: yourReview,
            SharedBy: username,
            Ott: selectedMovie.Ott,
            Family:selectedMovie.Family,
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
                console.log("Post created with ID:", id);
  
                  navigate(`/post/${id}`);
            }
        } catch (e) {
            console.log("Error during post:", e);
        }
  
        
    }
      
      
    

   
    return (
         <motion.div 
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col md:flex-row  shadow-md rounded-lg p-6 mt-10 md:p-8">
                                    <div className="md:w-1/3 mb-4 mt-10 md:mb-0">
                                        <img
                                            src={selectedMovie.Poster}
                                            alt={selectedMovie.Title}
                                            className="object-contain w-full h-48 md:h-96 rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-2/3 md:pl-6">
                                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedMovie.Title}</h1>
                                        <p className="text-lg text-white mb-2"><strong>Director:</strong> {selectedMovie.Director}</p>
                                        <p className="text-lg text-white mb-2"><strong>Genre:</strong> {selectedMovie.Genre}</p>
                                        <p className="text-lg text-white mb-2"><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                                        <p className="text-lg text-white mb-2 "><strong>OTT:</strong> {selectedMovie.Ott}</p>
                                        <p className="text-lg text-white mb-2 "><strong>Family-Friendly:</strong> {selectedMovie.Family}</p>
                        
                                        <h2 className="text-xl  text-white font-semibold  mb-2">Plot</h2>
                                        <p className="mb-2 text-white">{selectedMovie.Plot}</p>
                        
                                        <h2 className="text-xl text-white font-semibold mb-2">Your Review</h2>
                                        <textarea
                                            className="w-full p-3 bg-black text-white   rounded-lg mb-2 resize-none"
                                            rows="4"
                                            onChange={(e) => setYourReview(e.target.value)}
                                            value={yourReview}
                                        />
                        
                                        <p className="text-lg text-white mb-2"><strong>Shared By:</strong> {username}</p>
                        
                                        
                                        <button onClick={HandlePost} className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-black-600 transition">
                                            Post
                                        </button>
                                    </div>
                                   
                                </motion.div> 
        
        
            
          
    )
}