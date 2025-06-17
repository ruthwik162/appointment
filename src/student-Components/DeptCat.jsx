import React from "react";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const DeptCat = () => {
  const { dept, navigate } = useAppContext();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // const item = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  return (
    <div className="px-4 md:px-10 items-center pb-20 justify-center rounded-lg w-full max-w-7xl mx-auto">
      {/* Header with animated arrow */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex gap-2 items-center mb-2 cursor-pointer group"
        onClick={() => navigate('/departments')}
      >
        <h1 className="font-bold text-3xl md:text-4xl text-gray-800 group-hover:text-blue-600 transition-colors">
          Departments
        </h1>
        <motion.img 
          src={assets.black_arrow_icon} 
          className="w-6 h-6 mt-2 group-hover:translate-x-2 transition-transform"
          alt="Arrow icon"
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <p className="text-gray-600 mb-8 text-center md:text-left max-w-2xl">
        Explore our academic departments and discover the programs we offer
      </p>

      {/* Department grid */}
      <motion.div 
        className="grid gap-6 lg:grid-cols-6 md:grid-cols-3 grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {dept.map((item, index) => (
          <motion.div
            variants={item}
            className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: item.bgColor }}
            key={index}
            whileHover={{ scale: 1.1 }}
          >
            <div className="p-1">
              <motion.img
                className="rounded-lg w-full h-42 md:h-42 object-cover cursor-pointer"
                src={item.image}
                alt={item.name}
                onClick={() => navigate(`/faculty/${item.path.toLowerCase()}`)}
                aria-label={`Go to ${item.name} faculty`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p 
              className="text-center py-3 font-semibold text-gray-800 cursor-pointer capitalize text-sm md:text-base"
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.p>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <button 
                className="px-4 py-2 bg-white text-gray-800 cursor-pointer rounded-full text-sm font-medium shadow-md"
                onClick={() => navigate(`/faculty/${item.path.toLowerCase()}`)}
              >
                Explore
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View all button */}
      <motion.div 
        className="flex justify-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className="px-6 py-3 bg-[#06d6a0] text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-90"
          onClick={() => navigate('/faculty')}
        >
          View All Departments
        </button>
      </motion.div>
    </div>
  );
};

export default DeptCat;