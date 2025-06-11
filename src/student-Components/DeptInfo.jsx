import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext/AppContext';
import { FaEnvelope, FaUniversity, FaUserTie, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const DeptInfo = () => {
  const { teacher } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Filter only HODs and sort alphabetically by department
  const hodList = teacher
    ?.filter(item => item.designation === 'HOD')
    ?.sort((a, b) => a.department.localeCompare(b.department)) || [];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConsultClick = (hod) => {
    navigate(`/faculty/${hod.department}/${hod.email}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Head of Departments</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Meet our experienced department heads who guide our academic excellence
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <FiLoader className="animate-spin text-3xl text-blue-600 mb-2" />
            <p className="text-gray-600">Loading department heads...</p>
          </div>
        </div>
      ) : hodList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hodList.map((hod, index) => (
            <motion.div
              key={`${hod.email}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white flex flex-col sm:flex-row shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-full sm:w-1/3 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-teal-50">
                <img 
                  src={hod.image || '/default-avatar.jpg'} 
                  alt={`${hod.name}, Head of ${hod.department}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/default-avatar.jpg';
                  }}
                />
              </div>

              <div className="w-full sm:w-2/3 p-5 flex flex-col">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{hod.username}</h2>
                  <p className="text-sm text-blue-600 font-semibold mb-3 flex items-center">
                    <FaUserTie className="mr-2" />
                    <span className='uppercase'>{hod.designation}</span>
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-start">
                      <FaEnvelope className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
                      <a 
                        href={`mailto:${hod.email}`} 
                        className="hover:text-blue-600 break-words"
                        title={hod.email}
                      >
                        {hod.email}
                      </a>
                    </div>
                    {hod.phone && (
                      <div className="flex items-center">
                        <FaPhoneAlt className="mr-2 text-gray-500 flex-shrink-0" />
                        <a href={`tel:${hod.phone}`} className="hover:text-blue-600">
                          {hod.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center">
                      <FaUniversity className="mr-2 text-gray-500 flex-shrink-0" />
                      <span className="capitalize">{hod.department.toLowerCase()}</span>
                    </div>
                    {hod.experience && (
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-500 flex-shrink-0" />
                        <span>{hod.experience}+ years experience</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleConsultClick(hod)}
                  className="mt-auto bg-[#06d6a0] hover:bg-[#05c797] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-[1.02] active:scale-95"
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200"
        >
          <div className="w-16 h-16 mx-auto text-gray-400 mb-4">
            <FaUniversity className="w-full h-full" />
          </div>
          <p className="text-xl text-gray-600 font-medium">No Heads of Department found</p>
          <p className="text-gray-500 mt-2">Please check back later</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default DeptInfo;