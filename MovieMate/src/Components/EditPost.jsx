import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_Url } from "../config";
import { motion } from "framer-motion";
import { ToastContainer,toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [YourReview, setYourReview] = useState("");
  const [Ott, setOtt] = useState("");
  const [Family, setFamily] = useState("");
  const user = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backend_Url}/createpost/${id}`);
        setMovie(response.data);
        setYourReview(response.data.YourReview || "");
        setOtt(response.data.Ott || "");
        setFamily(response.data.Family || "");
      } catch (error) {
        console.log("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      Title: movie.Title,
      Poster: movie.Poster,
      Director: movie.Director,
      Genre: movie.Genre,
      Runtime: movie.Runtime,
      Plot: movie.Plot,
      YourReview: YourReview,
      SharedBy: user,
      Ott: Ott,
      Family: Family,
    };
    try {
      const response = await axios.put(`${backend_Url}/update/${id}`, postData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("post updated successfully")
        navigate(`/post/${id}`);
      }
    } catch (error) {
      console.log("Error updating post:", error);
      toast.error('Error updating post')
    }
  };
  console.log("Request URL:", `${backend_Url}/post/${id}`);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Edit Post</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster Section */}
        <div className="w-full md:w-1/3">
          <div className="w-full h-96 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={movie?.Poster}
              alt="poster"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-md  text-white font-semibold">Title</label>
              <input
                type="text"
                value={movie?.Title || ""}
                disabled
                className="w-full p-2  bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold">Director</label>
              <input
                type="text"
                value={movie?.Director || ""}
                disabled
                className="w-full p-2  bg-white text-blackborder border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold">Genre</label>
              <input
                type="text"
                value={movie?.Genre || ""}
                disabled
                className="w-full p-2 bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold">Runtime</label>
              <input
                type="text"
                value={movie?.Runtime || ""}
                disabled
                className="w-full p-2 bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold">Plot</label>
              <textarea
                value={movie?.Plot || ""}
                disabled
                rows="3"
                className="w-full p-2  bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

           
            <div>
              <label className="block text-md  text-white font-semibold">Your Review</label>
              <textarea
                value={YourReview}
                onChange={(e) => setYourReview(e.target.value)}
                rows="3"
                className="w-full p-2  bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold">OTT Platforms</label>
              <input
                type="text"
                value={Ott}
                onChange={(e) => setOtt(e.target.value)}
                className="w-full p-2  bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md  text-white font-semibold ">Family-Friendly</label>
              <input
                type="text"
                value={Family}
                onChange={(e) => setFamily(e.target.value)}
                className="w-full p-2  bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

           
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditPost;