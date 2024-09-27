import React, { createContext, useEffect,useState } from 'react';
export const MoviesStateContext = createContext();
import axios from 'axios';
import { backend_Url } from '../config';

export const MoviesStateContextProvider= ({ children }) =>{
        const[movies,setMovies] = useState([]);


        useEffect(() => {
            async function fetchPost() {
              try {
                const response = await axios.get(`${backend_Url}/movies`);
                if (Array.isArray(response.data)) {
                  setMovies(response.data.reverse());
                } else {
                  console.error("Expected an array, but got:", response.data);
                }
              } catch (error) {
                console.log("Error fetching post:",error);
              } finally {
              }
            }
            fetchPost();
          }, []);

        


        return(
            <MoviesStateContext.Provider value={{movies,setMovies}}>
                {children}
            </MoviesStateContext.Provider>
        )
}
