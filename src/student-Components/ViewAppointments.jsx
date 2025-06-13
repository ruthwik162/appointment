import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchAppointments = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) {
        setError("User not logged in");
        setAppointments([]);
        return;
      }
      const response = await axios.get(
        `https://appointment-server-api.onrender.com/api/student-appointments/${encodeURIComponent(user.email)}`
      );
      setAppointments(response.data || []);
    } catch (error) {
      console.error("Failed to load appointments", error);
      setError("Failed to load appointments. Please try again later.");
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };


  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Loading your appointments...</h2>
        <p className="text-gray-600 mt-2">Please wait while we fetch your schedule</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8 max-w-md bg-red-50 rounded-lg">
        <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">Error Loading Appointments</h2>
        <p className="text-red-600 mt-2">{error}</p>
        <button
          onClick={() => fetchAppointments()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full sm:-translate-y-40 md:-translate-y-0 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-1">
              {appointments.length} upcoming appointment{appointments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => fetchAppointments(true)}
            disabled={refreshing}
            className={`mt-4 sm:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center ${refreshing ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {refreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't booked any appointments yet.</p>
              <div className="mt-6">
                <button
                  onClick={() => fetchAppointments(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Check for New Appointments
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt, index) => (
              <div
                key={appt.id || index}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {appt.subject}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${appt.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </div>
                  {appt.message && (
                    <p className="mt-1 text-sm text-gray-600">{appt.message}</p>
                  )}
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(appt.date)} at {appt.slot}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Teacher</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {appt.teacherName || appt.teacherEmail || "Not specified"}
                      </p>
                      {appt.teacherEmail && (
                        <p className="mt-1 text-sm text-indigo-600">
                          {appt.teacherEmail}
                        </p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Actions</h4>
                      <div className="mt-1 space-x-2">
                        <button className="text-sm text-indigo-600 hover:text-indigo-900">
                          View Details
                        </button>
                        {appt.status !== "cancelled" && (
                          <button className="text-sm text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;