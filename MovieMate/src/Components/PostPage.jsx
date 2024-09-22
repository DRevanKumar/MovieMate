import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../config";

export function PostPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!movie) return <div className="text-center mt-10">Movie not found</div>;

    const handleDelete = async () => {
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
                console.log("Movie deleted successfully!");
                navigate('/');
            } else {
                alert("Failed to delete the movie.");
            }
        } catch (error) {
            alert("Error: " + error.response.data.message || "Failed to delete the movie.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6 md:p-8">
            <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="object-top w-full h-64 md:h-96 rounded-lg"
                />
            </div>
            <div className="md:w-2/3 md:pl-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{movie.Title}</h1>
                <p className="text-lg text-gray-600"><strong>Director:</strong> {movie.Director}</p>
                <p className="text-lg text-gray-600"><strong>Genre:</strong> {movie.Genre}</p>
                <p className="text-lg text-gray-600"><strong>Runtime:</strong> {movie.Runtime}</p>
                <p className="text-lg text-gray-600 mb-2"><strong>OTT:</strong> {movie.Ott}</p>
                <p className="text-lg text-gray-600 mb-4"><strong>Family-Friendly:</strong> {movie.Family}</p>

                <h2 className="text-xl font-semibold mb-2">Plot</h2>
                <p className="mb-4 text-gray-700">{movie.Plot}</p>

                <h2 className="text-xl font-semibold mb-2">Your Review</h2>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                    rows="4"
                    value={movie.YourReview}
                    readOnly
                />

                <p className="text-lg text-gray-600 mb-4"><strong>Shared By:</strong> {movie.SharedBy}</p>

                {token && (
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Delete Movie
                    </button>
                )}
            </div>
        </div>
    );
}
