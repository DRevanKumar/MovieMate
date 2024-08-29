import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Nav from './Components/Navbar'
import Quote from './Components/Quote'
import CardSlider from './Components/CardSlider'

function App() {
  return (
    <div className='w-full max-w-screen overflow-hidden'>
      <Nav />
      <div className='mb-0 pb-0'>
        <Quote />
      </div>
      <div className='-mt-48 md:mt-4'>
      <CardSlider></CardSlider>

      </div>
    </div>
  );
}

export default App;


