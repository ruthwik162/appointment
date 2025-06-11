import React from 'react'
import Mainbanner from '../student-Components/Mainbanner'
import DeptCat from '../student-Components/DeptCat'
import Testimonial from '../student-Components/Testimonial'

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-green-500/10'>
            <Mainbanner />
            <Testimonial/>
            <DeptCat />
        </div>
    )
}

export default Home


