import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../AppContext/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
    const { user } = useAppContext();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
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

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='flex items-center justify-center flex-col gap-6 p-6 w-full min-h-[70vh] md:min-h-[30vh]'
        >
            <motion.div variants={itemVariants}
                className="flex flex-row md:flex-row items-center justify-between gap-8 text-sm border border-gray-200 rounded-3xl p-6 max-w-8xl w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
                <motion.div variants={imageVariants} className='flex-1 flex justify-center'>
                    <img className="max-w-[100px] md:max-w-[180px] lg:max-w-[200px] transition-transform duration-300 hover:scale-105"
                        src={assets.yourappointment} alt="Appointment illustration" />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex-1 flex flex-col text-center md:text-left items-center md:items-start gap-4"
                >
                    {user ? (
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
                        >
                            Your Appointments<br />
                            <motion.span
                                initial={{ color: '#4f46e5' }}
                                animate={{ color: ['#4f46e5', '#ec4899', '#4f46e5'] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className='font-extrabold'
                            >
                                {user.username}!
                            </motion.span>
                        </motion.h2>
                    ) : (
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800"
                        >
                            Please Login to View<br />
                            <span className='text-indigo-600'>Your Appointments</span>
                        </motion.h2>
                    )}
                </motion.div>
            </motion.div>


        </motion.div>
    );
};

export default Appointment;