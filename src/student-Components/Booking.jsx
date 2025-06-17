import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext/AppContext";

const Booking = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    message: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const {URL} = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.email || !user?.username) {
        throw new Error("User not logged in or missing info");
      }

      const response = await axios.post(`${URL}/api/appointment-book`, {
        teacherEmail: email,
        subject: form.subject,
        message: form.message,
        date: form.date,
        slot: form.time,
        studentEmail: user.email,
        studentUsername: user.username,
      });

      if (response.status === 200) {
        setSuccessMsg("Appointment request sent successfully!");
        toast.success("Appointment request sent successfully!");
        setForm({ subject: "", message: "", date: "", time: "" });
        setTimeout(() => navigate("/my-appointment"), 2000);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || err.message || "Failed to book appointment.");
      toast.error(err.response?.data?.message || err.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate min date (today) and max date (3 months from today)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with back button */}
          <div className="bg-[#06d6a0] px-6 py-4  flex items-center justify-around">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white cursor-pointer hover:text-indigo-200 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back 
            </button>
            <h1 className="text-2xl font-bold text-white">Book Appointment</h1>
            <div className="w-5"></div> {/* Spacer for alignment */}
          </div>

          {/* Form content */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="What's this appointment about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  rows="4"
                  placeholder="Provide details about what you'd like to discuss..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={formatDate(today)}
                    max={formatDate(maxDate)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Select a date between today and {maxDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    required
                  >
                    <option value="">Select a time slot</option>
                    <option value="09:00">09:00 AM - 10:00 AM</option>
                    <option value="10:00">10:00 AM - 11:00 AM</option>
                    <option value="11:00">11:00 AM - 12:00 PM</option>
                    <option value="14:00">02:00 PM - 03:00 PM</option>
                    <option value="15:00">03:00 PM - 04:00 PM</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Each session is 1 hour long
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border max-w-xl i border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#06d6a0]  cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Send Appointment Request"
                  )}
                </button>
              </div>
            </form>

            {/* Status messages */}
            {successMsg && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-green-700 font-medium">{successMsg}</p>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">{errorMsg}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;