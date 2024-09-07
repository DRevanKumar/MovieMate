
import Nav from "./Navbar"
import Quote from "./Quote"
import CardSlider from "./CardSlider"

export default function Homepage(){
    return(
        <div className='w-full max-w-screen overflow-hidden'>
                <Nav />
            <div className='mb-0 pb-0'>
        <Quote />
          </div>
          <div className='-mt-48 md:mt-4'>
          <CardSlider></CardSlider>

          </div>
        </div>
    )
}