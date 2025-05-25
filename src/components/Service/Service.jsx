import React from 'react';
import { motion } from 'framer-motion';

const Service = ({ service }) => {
  const { icon, title, description } = service;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="w-16 h-16 flex items-center justify-center text-white bg-blue-600 rounded-full text-3xl mb-5 mx-auto shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default Service;
