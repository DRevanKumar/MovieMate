import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MoviesStateContextProvider } from './Components/Moviecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <MoviesStateContextProvider>
      

        <App />
      </MoviesStateContextProvider>


    </BrowserRouter>
  </StrictMode>,
)
