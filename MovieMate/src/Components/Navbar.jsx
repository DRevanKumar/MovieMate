import React, { useState } from 'react'

const Nav = () => {
    let Links =[
      {name:"Create Post",link:"/"},
      {name:"LogOut",link:"/"},
      
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0 mb-1'>
      <div className='md:flex items-center justify-between  bg-gray-600 py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-white'>
        <span className='text-3xl text-zinc-300 mr-2 mt-1 pt-2'>
        <ion-icon name="videocam-sharp"></ion-icon>
        </span>
        <p className='mt-1'>MovieMate</p>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6  cursor-pointer  md:hidden'>
      <ion-icon name={open ? 'close':'menu-outline'}></ion-icon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static md:bg-none bg-gray-600  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-lg  md:my-0 my-7'>
              <a href={link.link} className='text-white hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        
      </ul>
      </div>
    </div>
  )
}

export default Nav