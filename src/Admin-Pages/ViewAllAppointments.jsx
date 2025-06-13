import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
import { assets, deptDetails } from "../assets/assets";
import {
  FiLoader, FiCalendar, FiClock, FiUser, 
  FiMessageSquare, FiChevronDown, FiArrowLeft,
  FiSearch, FiFilter, FiX, FiAlertCircle
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const ViewAllAppointments = () => {
  const { department } = useParams();
  const navigate = useNavigate();
  const { teacher, dept, URL } = useAppContext();

  const [teachers, setTeachers] = useState([]);
  const [appointmentsMap, setAppointmentsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedTeachers, setExpandedTeachers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Get details for selected department
  const selectedDept = deptDetails.find(d => d.path.toLowerCase() === department?.toLowerCase());

  // Filter teachers by department
  useEffect(() => {
    if (!teacher.length) return;

    const deptTeachers = department
      ? teacher.filter(t =>
          t.department?.toLowerCase().replace(/\s+/g, '-') === department.toLowerCase()
        )
      : teacher;

    const onlyTeachers = deptTeachers.filter(t => t.role === 'teacher');
    setTeachers(onlyTeachers);
  }, [teacher, department]);

  // Fetch appointments for filtered teachers
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const newAppointments = {};

      try {
        await Promise.all(
          teachers.map(async (t) => {
            const res = await fetch(`${URL}/api/teacher-appointments/${encodeURIComponent(t.email)}`);
            const data = await res.json();
            newAppointments[t.email] = Array.isArray(data) ? data : [];
          })
        );
        setAppointmentsMap(newAppointments);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (teachers.length) fetchAppointments();
  }, [teachers]);

  const toggleTeacherExpansion = (email) => {
    setExpandedTeachers(prev => ({ ...prev, [email]: !prev[email] }));
  };

  // Filter appointments based on search and filters
  const filteredTeachers = teachers.filter(teacher => {
    // Search filter
    const matchesSearch = teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getFilteredAppointments = (appointments) => {
    return appointments.filter(appointment => {
      // Status filter
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
      
      // Date filter
      let matchesDate = true;
      if (dateFilter) {
        const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
        matchesDate = appointmentDate === dateFilter;
      }
      
      return matchesStatus && matchesDate;
    });
  };

  // Grid animation
  const gridAnim = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  // Card animation
  const cardAnim = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Department View
  if (!department) {
    return (
      <div className="px-4 md:px-10 mt-30 pb-20 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 items-center mb-2 group cursor-pointer"
        >
          <h1 className="font-bold text-3xl md:text-4xl text-gray-800 group-hover:text-blue-600 transition-colors">
            Departments
          </h1>
          <motion.img
            src={assets.black_arrow_icon}
            className="w-6 h-6 mt-2 group-hover:translate-x-2 transition-transform"
            alt="Arrow"
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        <p className="text-gray-600 mb-8 text-center md:text-left max-w-2xl">
          Explore our academic departments and discover the programs we offer
        </p>

        {/* Department Grid */}
        <motion.div
          className="grid gap-6 lg:grid-cols-6 md:grid-cols-3 grid-cols-2"
          variants={gridAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {dept.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow group"
              style={{ backgroundColor: item.bgColor }}
              whileHover={{ scale: 1.05 }}
              variants={cardAnim}
            >
              <div className="p-1">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-40 md:h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/allappointments/viewallappointments/${item.path.toLowerCase()}`)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="text-center py-3 font-semibold text-gray-800 cursor-pointer capitalize text-sm md:text-base"
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.p>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <button
                  className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium shadow-md hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/allappointments/viewallappointments/${item.path.toLowerCase()}`)}
                >
                  View Appointments
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <FiLoader className="animate-spin text-3xl text-blue-600" />
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center p-4">
        <FiAlertCircle className="text-4xl text-red-500" />
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Appointments View
  return (
    <div className="container mt-20 px-4  md:px-8 lg:px-20 mx-auto py-8">
      <div className="flex flex-row text-[3vw] md:text-[1vw] md:flex-row-reverse items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedDept ? `${selectedDept.name} Appointments` : "All Appointments"}
          </motion.h1>
          <p className="text-gray-600">
            {selectedDept ? selectedDept.department.replace(/-/g, " ") : "View appointments across all departments"}
          </p>
        </div>
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiArrowLeft /> Back to Departments
        </motion.button>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white  p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiX className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Teacher List */}
      <div className="space-y-4 gap-5 grid grid-cols-1 md:grid-cols-3">
        {filteredTeachers.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-gray-50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500">
              {searchTerm 
                ? `No teachers found matching "${searchTerm}"`
                : "No teachers found in this department."}
            </p>
          </motion.div>
        ) : (
          filteredTeachers.map((teacher) => {
            const appointments = getFilteredAppointments(appointmentsMap[teacher.email] || []);
            
            return (
              <motion.div
                key={teacher.email}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleTeacherExpansion(teacher.email)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={teacher.image}
                        alt={teacher.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      {appointments.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {appointments.length}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{teacher.username}</h3>
                      <p className="text-sm text-gray-500">{teacher.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {teacher.department?.replace(/-/g, " ")}
                    </span>
                    <FiChevronDown
                      className={`transition-transform ${
                        expandedTeachers[teacher.email] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedTeachers[teacher.email] && (
                    <motion.div
                      className="border-t border-gray-100 p-4 bg-gray-50"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {appointments.length === 0 ? (
                        <motion.div 
                          className="text-center py-4 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          No matching appointments found for this teacher.
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {appointments.map((appointment) => (
                            <motion.div
                              key={appointment.id}
                              className="p-3 bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-shadow"
                              whileHover={{ scale: 1.005 }}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-2">
                                  <FiCalendar className="text-gray-400" />
                                  <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiClock className="text-gray-400" />
                                  <span>{appointment.slot}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiUser className="text-gray-400" />
                                  <span className="truncate">{appointment.studentUsername}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiMessageSquare className="text-gray-400" />
                                  <span className="truncate">{appointment.message || "No message"}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    appointment.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : appointment.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {appointment.status}
                                </span>
                                <button
                                  onClick={() => navigate(`/allappointments/viewallappointments/  ${appointment.id}`)}
                                  className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                                >
                                  View Details
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ViewAllAppointments;