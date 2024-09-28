<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025"
     crossorigin="anonymous"></script>
</head>

import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";
import Search from "./Searchbar";

export default function Homepage() {
    return (
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
    );
}
