import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const AppointmentBanner = () => {
    // Animation variants with improved timing and effects
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.3
            }
        }
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
                mass: 0.5
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0, rotate: -5 },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: [0.17, 0.67, 0.83, 0.67]
            }
        },
        float: {
            y: [0, -17, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(6, 214, 160, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.98,
            boxShadow: "0 5px 10px rgba(6, 214, 160, 0.2)"
        }
    };

    const floatingElementVariants = {
        float: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        floatReverse: {
            y: [0, 15, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative w-full h-100 pt-30 py-16 md:py-20 lg:py-24 xl:py-28 "
        >
            {/* Improved background gradient with animation */}
            <motion.div
                className="absolute inset-0  z-0"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                        duration: 1.5,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }}
            />

            <div className="container mx-auto p-5 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    className="flex flex-row-reverse  md:flex-row-reverse items-center justify-between gap-6 md:gap-10 bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <motion.div
                        variants={containerVariants}
                        className="w-full md:w-1/2 p-6  md:p-8 lg:p-10 flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <motion.h2
                            variants={textVariants}
                            className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight"
                        >
                            Meet Our <span className="text-[#06d6a0]">Department</span> Heads
                        </motion.h2>

                        <motion.p
                            variants={textVariants}
                            className="text-sm md:text-ld text-gray-600 mb-6 md:mb-8 max-w-lg"
                        >
                            Schedule appointments with our experienced faculty leaders to discuss your academic journey.
                        </motion.p>

                        <motion.div
                            variants={textVariants}
                            className="flex flex-row   sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Link to="/faculty" className="w-full sm:w-auto">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full px-8 py-3 bg-gradient-to-r from-[#06d6a0] to-[#04b489] text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium md:text-[1vw] text-[2vw]"
                                >
                                    Book Appointment
                                </motion.button>
                            </Link>

                            <Link to="/faculty" className="w-full sm:w-auto">
                                <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50/50 transition-all font-medium text-[2vw] md:text-[1vw] flex items-center justify-center gap-2"
                                >
                                    View Faculty
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={imageVariants}
                        className="w-full md:w-1/2 pb-0 flex items-center justify-center relative scale-100 pl-30 md:p-0"
                        animate="float"
                    >
                        <img
                            src={assets.appointment1}
                            alt="HOD appointment illustration"
                            className="w-70 md:w-60 transform translate-x-30 max-w-md object-contain"
                            loading="lazy"
                        />
                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-4 -left-4 w-16 h-16 bg-[#06d6a0]/20 rounded-full hidden md:block"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full hidden md:block"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
                className="absolute top-1/4 left-1/6 w-8 h-8 bg-[#06d6a0]/20 rounded-full hidden md:block"
                variants={floatingElementVariants}
                animate="float"
            />
            <motion.div
                className="absolute bottom-1/3 right-1/5 w-6 h-6 bg-blue-500/20 rounded-full hidden md:block"
                variants={floatingElementVariants}
                animate="floatReverse"
                transition={{ delay: 0.5 }}
            />
            <motion.div
                className="absolute top-1/3 right-1/4 w-10 h-10 bg-teal-500/15 rounded-full hidden md:block"
                variants={floatingElementVariants}
                animate="float"
                transition={{ delay: 0.3, duration: 5 }}
            />
        </motion.section>
    );
};

export default AppointmentBanner;