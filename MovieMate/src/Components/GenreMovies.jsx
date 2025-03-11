import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MoviesStateContext } from "./Moviecontext";

export default function GenrePage() {
  const { genre } = useParams();
  const { movies } = useContext(MoviesStateContext);
  const navigate = useNavigate();







  const filterGenre = genre === "Love" ? "Romance" : genre;

  const filteredMovies = 
    filterGenre === "Other"
      ? movies.filter(movie => 
          !(
            movie.Genre.includes("Action") || 
            movie.Genre.includes("Comedy") || 
            movie.Genre.includes("Horror") || 
            movie.Genre.includes("Romance") || 
            movie.Genre.includes("Family") ||
            movie.Genre.includes("Thriller")
          )
        )
      : movies.filter(movie => movie.Genre.includes(filterGenre));
  
  


  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mt-12 mb-5 text-center">{genre} Movies</h1>

      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-400">No movies found for this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <div 
              key={movie._id} 
              className=" rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/post/${movie._id}`)}
            >
              <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-md" />
              <h3 className="mt-2 text-lg font-semibold truncate">{movie.Title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
