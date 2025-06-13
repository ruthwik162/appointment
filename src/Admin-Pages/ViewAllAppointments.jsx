import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';
import {
  FiLoader, FiCalendar, FiClock, FiUser, FiMessageSquare, FiChevronDown
} from 'react-icons/fi';
import { deptDetails } from '../assets/assets';
import Department from '../Admin-Components/Department';

const ViewAllAppointments = () => {
  const { department } = useParams();
  const navigate = useNavigate();
  const { teacher } = useAppContext();

  const [teachers, setTeachers] = useState([]);
  const [appointmentsMap, setAppointmentsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedTeachers, setExpandedTeachers] = useState({});
  const {URL} = useAppContext()

  // Filter teachers by department
  useEffect(() => {
    if (!teacher.length) return;

    const deptTeachers = department
      ? teacher.filter(t =>
          t.department?.toLowerCase().replace(/\s+/g, '-') === department.toLowerCase()
        )
      : teacher;

    setTeachers(deptTeachers);
  }, [teacher, department]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const newAppointments = {};

      try {
        await Promise.all(
          teachers.map(async (t) => {
            const response = await fetch(
              `${URL}/api/teacher-appointments/${encodeURIComponent(t.email)}`
            );

            if (response.ok) {
              const data = await response.json();
              newAppointments[t.email] = Array.isArray(data) ? data : [];
            } else {
              newAppointments[t.email] = [];
            }
          })
        );

        setAppointmentsMap(newAppointments);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    if (teachers.length) {
      fetchAppointments();
    }
  }, [teachers]);

  const toggleTeacherExpansion = (email) => {
    setExpandedTeachers(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  const getDepartmentDetails = () => {
    return deptDetails.find(d =>
      d.path.toLowerCase() === department?.toLowerCase()
    );
  };

  const dept = getDepartmentDetails();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <FiLoader className="animate-spin text-3xl text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-500">{error}</div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
        <Department/>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {dept ? `${dept.name} Appointments` : 'All Appointments'}
          </h1>
          <p className="text-gray-600">
            {dept ? dept.department.replace(/-/g, ' ') : 'View appointments across all departments'}
          </p>
        </div>
        <button
          onClick={() => navigate('/departments')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Departments
        </button>
      </div>

      {/* Teachers List */}
      <div className="space-y-4">
        {teachers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">
              No teachers found in this department.
            </p>
          </div>
        ) : (
          teachers.map(teacher => (
            <div
              key={teacher.email}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleTeacherExpansion(teacher.email)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={teacher.image}
                    alt={teacher.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{teacher.username}</h3>
                    <p className="text-sm text-gray-500">{teacher.designation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {teacher.department?.replace(/-/g, ' ')}
                  </span>
                  <FiChevronDown className={`transition-transform ${
                    expandedTeachers[teacher.email] ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>

              {/* Appointments Section */}
              {expandedTeachers[teacher.email] && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  {(appointmentsMap[teacher.email] || []).length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No appointments found for this teacher.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointmentsMap[teacher.email].map(appointment => (
                        <div
                          key={appointment.id}
                          className="p-3 bg-white rounded-lg border border-gray-100 shadow-xs"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-gray-400" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiClock className="text-gray-400" />
                              <span>{appointment.slot}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUser className="text-gray-400" />
                              <span>{appointment.studentUsername}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiMessageSquare className="text-gray-400" />
                              <span className="truncate">{appointment.message || 'No message'}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {appointment.status}
                            </span>
                            <button
                              onClick={() => navigate(`/appointments/${appointment.id}`)}
                              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAllAppointments;
