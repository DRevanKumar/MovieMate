// In your main CSS file, import the font
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

export default function Quote() {
    return (
      <div className="flex items-center justify-center mt-20 pb-5 w-screen bg-gray-900 ">
        <div className="text-orange-500 text-center pt-8 m  rounded-lg shadow-lg max-w-3xl">
          <p className="text-sm md:text-2xl flex justify-center items-start font-bold italic font-poppins">
            {/* <span className="text-7xl md:text-8xl text-orange-400 leading-none">“</span> */}
            Tired of scrolling endlessly <br></br>while your food gets cold? 
            we've got you covered. <br />
            Get quick recommendations and skip the research – <br />
            so you can enjoy your movie while the popcorn’s still hot!
            {/* <span className="text-7xl flex float-right  mr-2 md:text-7xl  text-orange-400 leading-none">"</span> */}
          </p>
        </div>
      </div>
    );
  }
  