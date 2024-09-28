

import Nav from "./Navbar";
import Quote from "./Quote";
import CardSlider from "./CardSlider";
import Search from "./Searchbar";

export default function Homepage() {
    return (
        <>
        <Helmet>
            <head>
            <title>MovieMate - Explore, Review, and Share Movies</title>
            <meta name="description" content="MovieMate is the ultimate platform to discover new movies, share reviews, and see what others are watching. Join the community today!"></meta>
            <meta name="keywords" content="movie reviews, movie sharing, film reviews, MovieMate, movies, cinema, films"></meta>

            <meta property="og:title" content="MovieMate - Discover and Review Movies"></meta>
            <meta property="og:description" content="Explore the latest movies, write reviews, and share your favorites on MovieMate."></meta>
            <meta property="og:image" content="" ></meta>
            <meta property="og:url" content="" ></meta>
            <meta property="og:type" content="website" ></meta>

            <meta name="twitter:card" content="summary_large_image" ></meta>
            <meta name="twitter:title" content="MovieMate - Explore, Review, and Share Movies"></meta>
            <meta name="twitter:description" content="Join MovieMate to discover new movies, write reviews, and share with friends."></meta>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1449278693756025"
                crossorigin="anonymous"></script>
            </head>
        </Helmet>

        
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
