import React from "react";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const DeptCat = () => {
  const { dept, navigate } = useAppContext();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { 
      y: 40,
      opacity: 0,
      scale: 0.85,
      rotate: -2
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
        mass: 0.5,
        duration: 0.7
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0,
      filter: "blur(4px)"
    },
    visible: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  const cardHover = {
    y: -8,
    scale: 1.03,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      backgroundColor: "rgba(0,0,0,0.2)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    hover: { 
      scale: 1,
      opacity: 1,
      transition: { delay: 0.1, type: "spring", stiffness: 300 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    },
    hover: {
      color: "#3b82f6",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="px-4 md:px-10 items-center pb-20 justify-center rounded-lg w-full max-w-7xl mx-auto">
      {/* Header with enhanced animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="flex gap-2 items-center mb-2 cursor-pointer group"
        onClick={() => navigate('/departments')}
      >
        <motion.h1 
          variants={titleVariants}
          className="font-bold text-3xl md:text-4xl text-gray-800 group-hover:text-blue-600 transition-colors"
        >
          Academic Departments
        </motion.h1>
        <motion.div
          animate={{
            x: [0, 6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut"
          }}
        >
          <motion.img 
            src={assets.black_arrow_icon} 
            className="w-6 h-6 mt-2 group-hover:translate-x-2 transition-transform"
            alt="Arrow icon"
          />
        </motion.div>
      </motion.div>

      <motion.p 
        className="text-gray-600 mb-8 text-center md:text-left max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Discover our diverse academic offerings through our specialized departments
      </motion.p>

      {/* Department grid with enhanced animations */}
      <motion.div 
        className="grid gap-6 lg:grid-cols-6 md:grid-cols-3 grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence>
          {dept.map((department, index) => (
            <motion.div
              variants={item}
              className="relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              style={{ backgroundColor: department.bgColor }}
              key={department.id}
              whileHover={cardHover}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <div className="p-1 overflow-hidden rounded-lg">
                <motion.img
                  className="rounded-lg w-full h-42 md:h-42 object-cover cursor-pointer"
                  src={department.image}
                  alt={department.name}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => navigate(`/faculty/${department.path.toLowerCase()}`)}
                  loading="lazy"
                />
              </div>
              
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                variants={overlayVariants}
                initial="hidden"
                whileHover="hover"
              >
                <motion.button 
                  className="px-5 py-2 bg-white text-gray-800 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
                  variants={buttonVariants}
                  onClick={() => navigate(`/faculty/${department.path.toLowerCase()}`)}
                >
                  <span>Explore</span>
                  <motion.span
                    animate={{
                      x: [0, 4, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5
                    }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>

              <motion.p 
                className="text-center py-3 font-semibold text-gray-800 cursor-pointer capitalize text-sm md:text-base relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {department.name}
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced View All button */}
      <motion.div 
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          delay: 0.5 + dept.length * 0.05, 
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <motion.button 
          className="px-8 py-3 bg-gradient-to-r from-[#06d6a0] to-[#118ab2] text-white rounded-2xl font-medium shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
          onClick={() => navigate('/faculty')}
          whileHover={{ 
            scale: 1.05,
            background: "linear-gradient(to right, #06d6a0, #0cbaba)",
            transition: { 
              duration: 0.4,
              yoyo: Infinity,
              repeatDelay: 0.5
            } 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Browse All Departments</span>
          <motion.span
            animate={{
              x: [0, 5, 0],
              transition: {
                repeat: Infinity,
                duration: 2
              }
            }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DeptCat;