import React from 'react';
import { motion } from 'framer-motion';

const Quote = () => {
  return (
    <div className="w-full lg:pt-16 pt-14 ms:pt-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration:1.0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-orange-500 font-light text-2xl sm:text-3xl mb-4">
          Movie Night, Simplified
        </h2>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-2 text-lg sm:text-xl text-gray-300 font-light"
        >
          <p>Tired of scrolling while your food gets cold?</p>
          <p className="text-orange-400 font-normal">We've got you covered.</p>
          <p>Quick recommendations, skip the research –</p>
          <p className="text-orange-400 font-normal">Enjoy movies with hot popcorn!</p>
        </motion.div>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-6 h-px bg-orange-500 w-full md:w-full lg:w-full"
        />
      </motion.div>
    </div>
  );
};

export default Quote;