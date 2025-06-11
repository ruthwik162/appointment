import React from 'react'
import TeacherAppointment from '../Teacher-components/TeacherAppointment'
import TeacherApprove from '../Teacher-components/TeacherApprove'

const ApproveAppointment  = () => {
  return (
    <div className='md:pt-30 m-auto flex items-center bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-green-500/10 justify-center flex-col gap-4 p-4'>
      <TeacherAppointment/>
      <TeacherApprove/>
    </div>
  )
}

export default ApproveAppointment 
