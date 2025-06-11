import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAppContext } from '../AppContext/AppContext';

const ViewAll = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {URL} = useAppContext();
    

    // const URL = "http://localhost:3000"

    const fetchDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${URL}/api/users`);
            const usersArray = Array.isArray(res.data?.users)
                ? res.data.users
                : Array.isArray(res.data)
                ? res.data
                : [];
            setUsers(usersArray || []);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to load users.");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [URL]);

    const totalStudents = users.filter(user => user.role === "student").length;
    const totalTeachers = users.filter(user => user.role === "teacher").length;

    const recentUsers = [...users]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="pb-25 p-10 md:px-25 lg:px-30">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Total Users"
                    value={users.length}
                    color="bg-amber-100 text-amber-600"
                />
                <StatCard
                    title="Students"
                    value={totalStudents}
                    color="bg-blue-100 text-blue-600"
                />
                <StatCard
                    title="Teachers"
                    value={totalTeachers}
                    color="bg-green-100 text-green-600"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Recent Users {users.length > 0 && `(${users.length} total)`}
                </h2>

                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading users...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">{error}</div>
                ) : users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <UserTable users={recentUsers} />
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No user data available
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`p-6 rounded-2xl shadow-md border border-gray-200 ${color.split(' ')[0]}`}
    >
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className={`text-4xl font-bold mt-2 ${color.split(' ')[1]}`}>{value}</p>
    </motion.div>
);

const UserTable = ({ users }) => (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
                <UserTableRow key={user._id || `user-${index}`} user={user} index={index} />
            ))}
        </tbody>
    </table>
);

const UserTableRow = ({ user, index }) => (
    <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
    >
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <UserAvatar name={user.username} />
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                        {user.username || 'Unnamed User'}
                    </div>
                </div>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.email || 'No email'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <UserRoleBadge role={user.role} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
        </td>
    </motion.tr>
);

const UserAvatar = ({ name }) => {
    const initial = name?.charAt(0)?.toUpperCase() || '?';
    return (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 font-medium">
                {initial}
            </span>
        </div>
    );
};

const UserRoleBadge = ({ role }) => {
    const roleStyles = {
        admin: 'bg-purple-100 text-purple-800',
        teacher: 'bg-green-100 text-green-800',
        student: 'bg-blue-100 text-blue-800',
    };

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${roleStyles[role] || 'bg-gray-100 text-gray-800'}`}>
            {role || 'unknown'}
        </span>
    );
};

export default ViewAll;
