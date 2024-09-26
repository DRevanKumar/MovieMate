
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

function App() {
  return (
     


    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/CreatePost' element={<CreatePost/>}></Route>
      <Route path='/post/:id' element={<PostPage/>}></Route>
      <Route path='/moviesByReviewer/:id' element={<MoviesByReviewer/>}></Route>

      </Route>

    </Routes>

    
  );
}

export default App;


