import React, { createContext, useState } from 'react';
export const MoviesStateContext = createContext();

export const MoviesStateContextProvider= ({ children }) =>{
        const[movies,setMovies] = useState('');


        return(
            <MoviesStateContext.Provider value={{movies,setMovies}}>
                {children}
            </MoviesStateContext.Provider>
        )
}
