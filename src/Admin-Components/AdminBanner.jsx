import React, { useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAppContext } from '../AppContext/AppContext';

const AdminBanner = () => {
    const { user } = useAppContext();
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const bannerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut"
            }
        },
        float: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };  

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.6,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: '#04b489', // Darker shade on hover
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.95
        }
    };

    return (
        <div className='flex items-center justify-center pt-40 px-4 sm:px-6 lg:px-8'>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={bannerVariants}
                className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-2xl w-full max-w-7xl bg-white shadow-lg overflow-hidden relative"
            >
                {/* Gradient background element */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#06d6a0]/10 to-[#06d6a0]/20 opacity-30 -z-1"></div>

                {/* Floating decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-[#06d6a0]/20 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#06d6a0]/20 rounded-full filter blur-3xl opacity-20"></div>

                <motion.div
                    variants={imageVariants}
                    className="relative w-full sm:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 z-10 flex justify-center"
                    animate="float" // Add the floating animation
                >
                    <img
                        src={assets.mainbanner1}
                        alt="excitedWomenImage"
                        className="w-full max-w-md h-85 object-contain transform hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <motion.div
                    variants={textVariants}
                    className="w-full sm:w-1/2 flex flex-col text-center sm:text-left items-center sm:items-start p-6 sm:p-8 md:p-10 lg:p-12 z-10"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                        Welcome <br />
                        {user ? (
                            <>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06d6a0] to-[#04b489]">
                                    {user.username}
                                </span>{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06d6a0] to-[#04b489]">
                                    {user.gender === "male" ? "Sir" : "Madam"}
                                </span>
                            </>
                        ) : (
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06d6a0] to-[#04b489]">
                                & please Login
                            </span>
                        )}
                    </h2>



                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="button"
                            aria-label="getStarted"
                            className="w-full sm:w-auto bg-[#06d6a0] hover:bg-[#04b489] px-8 py-3.5 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group font-medium"
                        >
                            Get started
                        </motion.button>

                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="button"
                            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3.5 transition-all duration-300 rounded-lg border border-gray-300 hover:border-[#06d6a0] hover:bg-[#06d6a0]/10"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-[#06d6a0]">Learn more</span>
                            <svg
                                className="mt-0.5 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-[#06d6a0]"
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 6h14M10 1l5 5-5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminBanner;