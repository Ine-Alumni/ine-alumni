import React from 'react'
import PrivateSection1 from './PrivateSection1'
import PrivateSection2 from './PrivateSection2'
import Section3 from './Section3'
import Section4 from './Section4'


const PrivateHome = () => {
  return (
    <div className='pb-20'>
      <PrivateSection1/>
      <PrivateSection2 />
      <Section3 />
      <Section4 />
    </div>
  )
}

export default PrivateHome