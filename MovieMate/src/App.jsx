
import './index.css'

import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Login from './Components/Login'
import CreatePost from './Components/CreatePost'
import { PostPage } from './Components/PostPage'

function App() {
  return (

    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/CreatePost' element={<CreatePost/>}></Route>
      <Route path='/post/:id' element={<PostPage/>}></Route>

    </Routes>
    
  );
}

export default App;


