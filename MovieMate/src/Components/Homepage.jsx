import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";
import Search from "./Searchbar";

export default function Homepage() {
    return (
        <div className='w-full max-w-screen overflow-hidden'>
            <div className='sticky top-0 z-50'> 
                <Nav />
            </div>
            <div className='relative z-40 mt-24'>
                <Search />
            </div>
            <div className='mb-0 pb-0'>
                {/* Ensure Quote is below Search */}
                <Quote />
            </div>
            <div className='-mt-10'>
                <CardSlider />
            </div>
        </div>
    );
}
