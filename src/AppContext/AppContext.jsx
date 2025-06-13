import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deptDetails } from "../assets/assets";

export const AppContext = createContext();

const URL = "https://appointment-server-api.onrender.com";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [dept, setDept] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [appointments, setAppointments] = useState([]); // ✅ added

  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/role/teacher`);
      setTeacher(res.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${URL}/api/users`);
      setTeacher(res.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${URL}/api/appointments`);
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const fetchDept = async () => {
    setDept(deptDetails);
  };

  useEffect(() => {
    fetchTeacher();
    fetchDept();
    fetchAll();
    fetchAppointments(); // ✅ added
  }, []);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
      return;
    }
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  const register = async (formData) => {
    try {
      await axios.post(`${URL}/api/users`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Registration successful! Please log in.");
      localStorage.setItem("user", JSON.stringify(formData));
      sessionStorage.setItem("user", JSON.stringify(formData));
      navigate("/");
      setShowUserLogin(true);
    } catch (error) {
      console.error("Registration error:", error.response || error);
      toast.error(error.response?.data?.message || "Error registering user.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${URL}/api/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const user = response.data;

        if (!user || !user.id) {
          toast.error("Login failed: Invalid user data");
          return;
        }

        if (user === "student") {
          navigate("/");
        }
        if (user === "teacher") {
          navigate("/teacher-home");
        }
        if (user === "admin") {
          navigate("/adminhome");
        }

        const userDetails = {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          gender: user.gender,
          password: user.password,
          Image: user.image,
        };

        localStorage.setItem("user", JSON.stringify(userDetails));
        sessionStorage.setItem("user", JSON.stringify(userDetails));
        setUser(userDetails);

        toast.success("Logged in successfully!");
        navigate(user.role === "admin" ? "/adminhome" : "/");
        setShowUserLogin(false);
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        dept,
        setDept,
        navigate,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        searchQuery,
        setSearchQuery,
        register,
        teacher,
        setTeacher,
        login,
        logout,
        appointments, // ✅ added
        setAppointments,
        URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
