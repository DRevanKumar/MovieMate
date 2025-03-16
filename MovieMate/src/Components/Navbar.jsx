import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoviesStateContext } from './Moviecontext';

const Nav = () => {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user=localStorage.getItem('username')
  

  useEffect(() => {
    if (token) {
      setLinks([
        { name: "My Reviews", link: `/movies/${user}` },
        { name: "Write a Review", link: "/CreatePost" },
        { name: "Logout", link: '/' },  
        
      ]);
    } else {
      setLinks([
        { name: "Login", link: "/login" },
      ]);
    }
  }, [token]);


  const HandleRedirect=()=>{
    navigate('/');
    setOpen(false)
  }


  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (link === "Logout") {
      localStorage.removeItem('token');
      navigate('/');
    } else if (link === "Write a Review") {
      navigate('/CreatePost');
    } else if (link === "Login") {
      navigate("/login");

    }else if(link === "My Reviews"){
      navigate(`/movies/${user}`);
    }
    
    else {
      navigate("/");
    }
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      className='shadow-md w-full fixed top-0 left-0 z-50 bg-gray-900'
    >
      <div className='flex flex-wrap items-center justify-between py-4 px-4 md:px-10'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='font-bold text-2xl cursor-pointer flex items-center text-white'
        >
          <span className='text-3xl text-zinc-300 mr-2 flex items-center'>
            <ion-icon name="videocam"></ion-icon>
          </span>
          <p onClick={() => HandleRedirect()} className="flex items-center">MovieMate</p>
        </motion.div>



        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className='text-3xl cursor-pointer md:hidden text-white'
        >
          <ion-icon name={open ? 'close' : 'menu-outline'}></ion-icon>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='md:flex md:items-center w-full md:w-auto'
            >
              {links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  className='md:ml-8 text-lg md:my-0 my-7'
                >
                  <a
                    href={link.link}
                    onClick={(event) => handleLinkClick(event, link.name)}
                    className='text-white hover:text-gray-400 duration-500 cursor-pointer'
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <ul className='hidden md:flex md:items-center'>
          {links.map((link) => (
            <motion.li
              key={link.name}
              whileHover={{ scale: 1.1 }}
              className='md:ml-8 text-lg'
            >
              <a
                href={link.link}
                onClick={(event) => handleLinkClick(event, link.name)}
                className='text-white hover:text-gray-400 duration-500 cursor-pointer'
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
