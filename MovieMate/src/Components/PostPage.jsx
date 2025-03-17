<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025"
     crossorigin="anonymous"></script>
</head>


import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../config";
import { motion } from "framer-motion";

import { Helmet } from "react-helmet-async";
import AdSenseScript from "./AdSen";
const user = localStorage.getItem('username');

export function PostPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    const navigate = useNavigate();
    const[deleteLoader,setDeleteLoader] = useState(false)

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`${backend_Url}/createpost/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.log("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    const navigateToPost=()=>{
        navigate('/addreview', { state: movie });
      }
    

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!movie) return <div className="text-center mt-10">Movie not found</div>;

    const handleDelete = async () => {

        setDeleteLoader(true)
        if (!token) {
            alert("Unauthorized: No token found.");
            return;
        }

        try {
            const response = await axios.delete(`${backend_Url}/post/${id}`, {
                headers: {
                    Authorization: `${token}`, 
                },
            });

            if (response.status === 200) {
                setDeleteLoader(!deleteLoader)

                setTimeout(()=>navigate('/'),200);
            } else {
                alert("failed to delete")
            }
        } catch (error) {
            
        }
    };

    if (deleteLoader) return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center mt-48 top-1/2"
        >
          <div className="animate-spin top-1/2 mt-48 rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      );

    return (
        <>
        
        <AdSenseScript></AdSenseScript>
        <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row  shadow-md rounded-lg p-6 mt-10 md:p-8">
            <div className="md:w-1/3 mb-4 mt-10 md:mb-0">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="object-contain w-full h-48 md:h-96 rounded-lg"
                />
            </div>
            <div className="md:w-2/3 md:pl-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.Title}</h1>
                <p className="text-lg text-white mb-2"><strong>Director:</strong> {movie.Director}</p>
                <p className="text-lg text-white mb-2"><strong>Genre:</strong> {movie.Genre}</p>
                <p className="text-lg text-white mb-2"><strong>Runtime:</strong> {movie.Runtime}</p>
                <p className="text-lg text-white mb-2 "><strong>OTT:</strong> {movie.Ott}</p>
                <p className="text-lg text-white mb-2 "><strong>Family-Friendly:</strong> {movie.Family}</p>

                <h2 className="text-xl  text-white font-semibold  mb-2">Plot</h2>
                <p className="mb-2 text-white">{movie.Plot}</p>

                <h2 className="text-xl text-white font-semibold mb-2">Your Review</h2>
                <textarea
                    className="w-full p-3 bg-black text-white   rounded-lg mb-2 resize-none"
                    rows="4"
                    value={movie.YourReview}
                    readOnly
                />

                <p className="text-lg text-white mb-2"><strong>Shared By:</strong> {user}</p>

                {(token && user===movie.SharedBy) && (
                    <div className="flex  relative left-36 md:flex-row md:align-baseline md:justify-self-auto">
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Delete Review
                    </button>
                    <button
      onClick={() => navigate(`/editpost/${id}`)} 
      className="bg-orange-600 ml-3 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-200"
    >
      Edit Review
    </button>
                    </div>
                )}
                
                <button onClick={navigateToPost}  
                className=" flex relative bottom-10 left-0 bg-blue-600 ml-3 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                Add Review
                </button>
                
            </div>
           
        </motion.div>
        </>
    );
}
