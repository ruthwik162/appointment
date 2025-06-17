import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="py-5 pb-5 px-4 flex items-center justify-center sm:px-6  lg:px-25">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative bg-white border border-gray-200 rounded-2xl shadow-xl max-w-9xl mx-auto p-8 sm:p-12 text-center sm:text-left overflow-hidden"
      >
        {/* Background gradient blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06d6a0]/10 to-[#04b489]/20 opacity-30 -z-10 rounded-2xl"></div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-[#06d6a0]/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#04b489]/20 rounded-full blur-3xl opacity-20"></div>

        <motion.h1
          variants={textVariants}
          className="text-3xl sm:text-4xl items-center justify-center flex font-bold text-gray-800 mb-6"
        >
          About Our Aim
        </motion.h1>

        <motion.p
          variants={textVariants}
          className="text-gray-600 text-base sm:text-lg md:text-[1vw] leading-relaxed max-w-6xl mx-auto"
        >
          In today’s fast-paced academic environment, time management and effective communication are
          key to student success and faculty productivity. Traditional methods of scheduling
          appointments between students and teachers—such as manual sign-ups, emails, or in-person
          coordination—are often inefficient, error-prone, and time-consuming.
          <br />
          <br />
          Our platform transforms this process with a modern, web-based solution that empowers both
          students and faculty with seamless scheduling, communication, and transparency.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
