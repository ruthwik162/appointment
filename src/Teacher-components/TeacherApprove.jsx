import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext/AppContext";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMail, FiBook, FiCheck, FiX, FiLoader } from "react-icons/fi";
import {  toast } from "react-hot-toast";

const TeacherApprove = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "pending", "approved", "cancelled"
  const { user } = useAppContext();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");
        
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData?.email) {
          setError("User not logged in");
          setAppointments([]);
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/teacher-appointments/${encodeURIComponent(userData.email)}`
        );
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to load appointments.");
        toast.error("Failed to load appointments. Please try again later.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const toggleApproval = async (id, currentStatus) => {
    const newStatus = currentStatus === "approved" ? "pending" : "approved";
    setUpdatingId(id);
    try {
      await axios.patch(`http://localhost:3000/api/appointment/${id}`, { status: newStatus });
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
      );
      toast.success(`Appointment ${newStatus === "approved" ? "approved" : "set to pending"} successfully!`);
    } catch (err) {
      toast.error("Failed to update appointment status. Please try again.",err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    if (filter === "all") return true;
    return appt.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return { bg: "bg-green-50", text: "text-green-800", border: "border-green-200" };
      case "cancelled":
        return { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" };
      default:
        return { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-3xl text-blue-600 mb-2" />
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-4 bg-red-50 rounded-lg max-w-md">
          <FiX className="mx-auto text-3xl text-red-600 mb-2" />
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl -mt-[150px] md:mt-0 mx-auto p-6">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Management</h1>
        <p className="text-gray-600">Manage appointments for <span className="font-semibold text-blue-600">{user?.username}</span></p>
        
        <div className="flex flex-wrap gap-3 mt-6 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "all" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All ({appointments.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "pending" ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Pending ({appointments.filter(a => a.status === "pending").length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "approved" ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Approved ({appointments.filter(a => a.status === "approved").length})
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${filter === "cancelled" ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Cancelled ({appointments.filter(a => a.status === "cancelled").length})
          </button>
        </div>
      </motion.div>

      {filteredAppointments.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg"
        >
          <FiCalendar className="text-4xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No appointments found</h3>
          <p className="text-gray-500 mt-1 text-center max-w-md">
            {filter === "all" 
              ? "You don't have any appointments yet." 
              : `You don't have any ${filter} appointments.`}
          </p>
        </motion.div>
      ) : (
        <motion.ul className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {filteredAppointments.map(({ id, subject, date, slot, studentEmail, status }) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-lg shadow-sm border ${getStatusColor(status).border} ${getStatusColor(status).bg} transition-all hover:shadow-md`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <FiBook className={`text-lg ${getStatusColor(status).text}`} />
                    <h3 className="font-semibold text-gray-800">{subject}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCalendar />
                      <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiClock />
                      <span>{slot}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail />
                      <span>{studentEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status).text} ${getStatusColor(status).border} border`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                  
                  {status !== "cancelled" && (
                    <button
                      onClick={() => toggleApproval(id, status)}
                      disabled={updatingId === id}
                      className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                        status === "approved"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } transition min-w-[120px] justify-center`}
                    >
                      {updatingId === id ? (
                        <>
                          <FiLoader className="animate-spin" />
                          <span>Processing</span>
                        </>
                      ) : status === "approved" ? (
                        <>
                          <FiX />
                          <span>Revoke</span>
                        </>
                      ) : (
                        <>
                          <FiCheck />
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default TeacherApprove;