import React from 'react'
import Appointment from '../student-Components/Appointment';
import ViewAppointments from '../student-Components/ViewAppointments';
// import { assets } from '../assets/assets'


const MyAppointment = () => {
  return (
    <div className='md:pt-30 m-auto flex items-center bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-green-500/10 justify-center flex-col gap-4 p-4'>
      <Appointment/>
      <ViewAppointments/>
    </div>
  )
}

export default MyAppointment
