
import './index.css'

import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Login from './Components/Login'
import CreatePost from './Components/CreatePost'
import { PostPage } from './Components/PostPage'
import Layout from './Components/Layout'
import { MoviesStateContextProvider } from './Components/Moviecontext'
import Nav from './Components/Navbar'
import CardSlider from './Components/CardSlider'
import MoviesByReviewer from './Components/IndividualMovies'

import GenreMovies from './Components/GenreMovies'
import Signup from './Components/Signup'
import Movie from './Components/Movie'
import AddReview from './Components/AddReview'
import EditPost from './Components/EditPost'
import UpdatePassword from './Components/UpdatePassword'

function App() {
  return (
    <>
   
     


    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/CreatePost' element={<CreatePost/>}></Route>
      <Route path='/post/:id' element={<PostPage/>}></Route>
      <Route path='/movie/:id' element={<Movie/>}></Route>  
      <Route path='/movies/:id' element={<MoviesByReviewer/>}></Route>
      <Route path='/genre/:genre' element={<GenreMovies/>}></Route>
      <Route path='/addreview' element={<AddReview/>}></Route>
      <Route path='/editpost/:id' element={<EditPost/>}></Route>
      <Route path='/updatepassword' element={<UpdatePassword/>}></Route>

      
      


      </Route>

    </Routes>
    </>

    
  );
}

export default App;


