import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiEdit, FiTrash2, FiUser, FiMail, FiBook, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../AppContext/AppContext';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, teacher: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const {URL} = useAppContext();

const fetchTeachers = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${URL}/api/users`);
    const teacherData = res.data.filter(user => user.role === 'teacher');
    setTeachers(teacherData);
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    toast.error('Failed to fetch teachers');
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (email) => {
    try {
      await axios.delete(`${URL}/api/users/${email}`);
      setTeachers(teachers.filter(teacher => teacher.email !== email));
      toast.success('Teacher deleted successfully');
      setDeleteConfirm({ open: false, email: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to delete teacher');
    }
  };

  const handleUpdate = async (updatedTeacher) => {
    try {
      await axios.put(`${URL}/api/users/${updatedTeacher.email}`, updatedTeacher);
      setTeachers(teachers.map(teacher => 
        teacher.email === updatedTeacher.email ? updatedTeacher : teacher
      ));
      setEditModal({ open: false, teacher: null });
      toast.success('Teacher updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to update teacher');
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedTeachers = () => {
    const sortableTeachers = [...teachers];
    if (sortConfig.key) {
      sortableTeachers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTeachers;
  };

  const getFilteredTeachers = () => {
    const sortedTeachers = getSortedTeachers();
    if (!searchTerm) return sortedTeachers;
    
    return sortedTeachers.filter(teacher => 
      teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  useEffect(() => {
    fetchTeachers();
  });

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading && teachers.length === 0) {
    return (
      <div className="flex items-center justify-center h-90">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mt-25 mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Teacher Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teachers..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <FiUser />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('username')}
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    Name {renderSortIcon('username')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center">
                    <FiMail className="mr-2" />
                    Email {renderSortIcon('email')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort('subject')}
                >
                  <div className="flex items-center">
                    <FiBook className="mr-2" />
                    Subject {renderSortIcon('subject')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {getFilteredTeachers().length > 0 ? (
                  getFilteredTeachers().map((teacher) => (
                    <motion.tr 
                      key={teacher.email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FiUser />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{teacher.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {teacher.subject || 'Not specified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditModal({ open: true, teacher })}
                          className="mr-3 text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ open: true, email: teacher.email })}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white"
                  >
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm ? 'No teachers match your search' : 'No teachers found'}
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Teacher Modal */}
      <AnimatePresence>
        {editModal.open && (
          <EditTeacherModal
            teacher={editModal.teacher}
            onClose={() => setEditModal({ open: false, teacher: null })}
            onSave={handleUpdate}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg max-w-md w-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Confirm Deletion</h3>
                <button onClick={() => setDeleteConfirm({ open: false, email: '' })}>
                  <FiX className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <p className="mb-6">Are you sure you want to delete this teacher? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm({ open: false, email: '' })}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.email)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EditTeacherModal = ({ teacher, onClose, onSave }) => {
  const [formData, setFormData] = useState(teacher);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white p-6 rounded-lg max-w-md w-full"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Edit Teacher</h2>
          <button onClick={onClose}>
            <FiX className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject taught"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheck className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ViewTeachers;