

import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";
import Search from "./Searchbar";

import { ToastContainer,toast } from "react-toastify";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function Homepage() {
    const token=localStorage.getItem("token")
    
    return (
        <>
        
        

        
        <div className='w-full max-w-screen overflow-hidden'>
            
        
            
            
            <div className='relative z-40 mt-24 '>
                <Search />
            </div>
            <p className={`${token ? 'hidden' : 'block'} relative top-8 text-center text-lg text-gray-700 dark:text-gray-300  p-4 rounded-lg  shadow-md`}>
  🚀 Please <a href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">log in</a> to add your review and share your thoughts!
</p>

            <div className='mb-0 pb-0 pt-1'>
                
                <Quote />
            </div>
            <div className='-mt-10'>
                <CardSlider />
            </div>
        </div>
        </>
    );
}
