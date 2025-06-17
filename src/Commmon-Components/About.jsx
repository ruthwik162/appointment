import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const gradientVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.3,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-12 flex justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative bg-white border border-gray-200 rounded-2xl shadow-xl w-full max-w-7xl p-6 sm:p-10 md:p-12 overflow-hidden"
      >
        {/* Background gradients with animation */}
        <motion.div 
          variants={gradientVariants}
          className="absolute inset-0 bg-gradient-to-br from-[#06d6a0]/10 to-[#04b489]/20 -z-10 rounded-2xl"
        />
        <motion.div 
          variants={gradientVariants}
          className="absolute top-0 left-0 w-20 h-20 bg-[#06d6a0]/20 rounded-full blur-3xl"
        />
        <motion.div 
          variants={gradientVariants}
          className="absolute bottom-0 right-0 w-32 h-32 bg-[#04b489]/20 rounded-full blur-3xl"
        />

        {/* Title with staggered animation */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left"
        >
          About Our Aim
        </motion.h1>

        {/* Paragraphs with staggered animation */}
        <motion.div variants={containerVariants}>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg leading-relaxed text-center md:text-left mb-6"
          >
            In today's fast-paced academic environment, time management and effective communication are
            key to student success and faculty productivity. Traditional methods of scheduling
            appointments between students and teachers—such as manual sign-ups, emails, or in-person
            coordination—are often inefficient, error-prone, and time-consuming.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg leading-relaxed text-center md:text-left"
          >
            Our platform transforms this process with a modern, web-based solution that empowers both
            students and faculty with seamless scheduling, communication, and transparency.
          </motion.p>
        </motion.div>

        {/* Decorative animated elements */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#06d6a0]/10 rounded-full blur-xl"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-[#04b489] rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default About;