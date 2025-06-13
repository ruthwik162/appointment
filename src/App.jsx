import React from 'react'
import Navbar from './student-Components/Navbar'
import Home from './Student-Pages/Home'
import Faculty from './Student-Pages/Faculty'
import Deparment from './Student-Pages/Deparment'
import MyAppointment from './Student-Pages/MyAppointment'
import Booking from './student-Components/Booking'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './AppContext/AppContext'
import ApproveAppointment from './Teacher-Pages/ApproveAppointment '
import TeacherNavbar from './Teacher-components/TeacherNavbar'
import TeacherHome from './Teacher-Pages/TeacherHome'
import Footer from './Commmon-Components/Footer'
import Profile from './Commmon-Components/Profile'
import Login from './Commmon-Components/Login'
import AdminNav from './Admin-Components/AdminNav'
import ViewTeacher from './Admin-Pages/ViewTeacher'
import ViewStudents from './Admin-Pages/ViewStudents'
import Admin from './Admin-Pages/Admin'
import ViewAllAppointments from './Admin-Pages/ViewAllAppointments'
import AllAppointments from './Admin-Pages/AllAppointments'

const App = () => {
  const { showUserLogin, user } = useAppContext()
  const isAdmin = user?.role === 'admin'
  const student = user?.role === 'student'
  const teacher = user?.role === 'teacher'

  const renderNavbar = () => {
    if (student) return <Navbar />
    if (teacher) return <TeacherNavbar />
    if (isAdmin) return <AdminNav />
    return <Navbar />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {renderNavbar()}

      {showUserLogin && <Login />}
      <Toaster toastOptions={{ style: { zIndex: 1001 } }} />

      <div className="flex-grow">
        <Routes>
          {/* Common Routes */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />

          {/* Admin Routes */}
          <Route path='/adminhome' element={<Admin />} />
          <Route path='/viewteachers' element={<ViewTeacher />} />
          <Route path='/viewstudents' element={<ViewStudents />} />
          <Route path='/viewallappointments' element={<ViewAllAppointments />} />
          <Route path='/allappointments' element={<AllAppointments />} />
          <Route path='/allappointments/viewallappointments/:department' element={<ViewAllAppointments />} />

          {/* Student Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/department' element={<Deparment />} />
          <Route path='/department/:dept/:email' element={<Deparment />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/faculty/:dept' element={<Faculty />} />
          <Route path='/faculty/:dept/:email' element={<Booking />} />
          <Route path='/my-appointment' element={<MyAppointment />} />

          {/* Teacher Routes */}
          <Route path='/teacher-home' element={<TeacherHome />} />
          <Route path='/approve-appointment' element={<ApproveAppointment />} />
          <Route path='/approve-appointment/:id' element={<ApproveAppointment />} />
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </div>
  )
}


export default App;