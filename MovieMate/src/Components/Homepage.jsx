import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";

export default function Homepage() {
    return (
        <div className='w-full max-w-screen overflow-hidden'>
            <div className='sticky top-0 z-50 bg-white'> {/* Add this wrapper */}
                <Nav />
            </div>
            <div className='mb-0 pb-0'>
                <Quote />
            </div>
            <div className='mt-4'>
                <CardSlider />
            </div>
        </div>
    );
}