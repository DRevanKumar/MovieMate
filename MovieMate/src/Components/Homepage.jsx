

import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";
import Search from "./Searchbar";
import { Helmet } from "react-helmet-async";
import AdSenseScript from "./AdSen";

export default function Homepage() {
    return (
        <>
        
        <AdSenseScript></AdSenseScript>

        
        <div className='w-full max-w-screen overflow-hidden'>
            
            <div className='relative z-40 mt-24 '>
                <Search />
            </div>
            <div className='mb-0 pb-0 pt-1'>
                {/* Ensure Quote is below Search */}
                <Quote />
            </div>
            <div className='-mt-10'>
                <CardSlider />
            </div>
        </div>
        </>
    );
}
