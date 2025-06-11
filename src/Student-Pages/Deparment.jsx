import React from 'react'
import DeparmentBanner from '../student-Components/DepartmentBanner'
import DeptInfo from '../student-Components/DeptInfo'

const Deparment = () => {
  return (
    <div className='bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-green-500/10'>
      <DeparmentBanner/>
      <DeptInfo/>
    </div>
  )
}

export default Deparment
