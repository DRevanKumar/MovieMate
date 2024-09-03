import './index.css'
import Nav from './Components/Navbar'
import Quote from './Components/Quote'
import CardSlider from './Components/CardSlider'
import { Route, Routes } from 'react-router-dom'
import CreatePost from './Components/CreatePost'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={
          <div className='w-full max-w-screen overflow-hidden'>
            <div className='mb-0 pb-0'>
              <Quote />
            </div>
            <div className='mt-10 md:mt-10'>
              <CardSlider />
            </div>
          </div>
        } />
        <Route path='/CreatePost' element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
