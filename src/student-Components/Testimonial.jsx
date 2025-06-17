import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Testimonial = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      x: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const avatarVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const starVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.3, 
      rotate: [0, 15, -10, 5, 0],
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 300 
      } 
    }
  };

  return (
    <div className='px-5 md:px-10 flex items-center justify-center'>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative mt-8 p-7 md:p-10 bg-gradient-to-br from-white to-gray-50 rounded-xl flex flex-col md:flex-row md:gap-20 shadow-lg border border-gray-100 max-w-full md:max-w-7xl mx-auto"
      >
        {/* Live Demo Badge */}
        <motion.div
          variants={itemVariants}
          className="absolute -top-3 -right-3 bg-white px-4 py-2 rounded-full shadow-md flex items-center z-10"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-3 h-3 bg-green-400 rounded-full mr-2 shadow-md"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-medium text-gray-700">
            Live demo available
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* User Avatars */}
          <motion.div
            variants={itemVariants}
            className="flex -space-x-2 relative"
          >
            {[1, 2, 3].map((item) => (
              <motion.img
                key={item}
                src={`https://randomuser.me/api/portraits/women/${item + 20}.jpg`}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white hover:border-blue-200 transition-all duration-300"
                custom={item}
                variants={avatarVariants}
                whileHover={{ y: -5, zIndex: 10, scale: 1.1 }}
              />
            ))}
            <motion.div
              className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            >
              +
            </motion.div>
          </motion.div>

          {/* Rating Text */}
          <motion.div
            variants={itemVariants}
            className="text-left"
          >
            <motion.p
              className="text-sm text-gray-600 mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Trusted by <span className="font-semibold text-gray-800">10,000+</span> users
            </motion.p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  variants={starVariants}
                  initial="initial"
                  whileHover="hover"
                  custom={i}
                  animate={{
                    y: [0, -3, 0],
                    transition: {
                      delay: i * 0.1 + 0.6,
                      repeat: Infinity,
                      repeatDelay: 3,
                      duration: 0.6
                    }
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
              <motion.span
                className="text-sm text-gray-600 ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="font-semibold text-gray-800">5.0</span> (2.1k reviews)
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Testimonial text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.1, 
            duration: 0.6,
            ease: "backOut"
          }}
          className="mt-4 pt-4 border-t border-gray-100 md:border-t-0 md:border-l md:pl-6"
        >
          <motion.p 
            className="text-gray-600 italic text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            It not only simplifies scheduling but also empowers both parties with transparency and control over their availability, thus creating a more efficient and collaborative educational experience.
          </motion.p>
          <motion.p 
            className="text-right text-xs text-gray-500 mt-1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            — Sarah J., Product Designer
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Testimonial;