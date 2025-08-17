import React from 'react'
import MergedSection1 from './MergedSection1'
import MergedSection2 from './MergedSection2'
import Section3 from './Section3'
import Section4 from './Section4'

const Home = () => {
  return (
    <div className='pb-20 mt-16'>
      <MergedSection1 />
      <MergedSection2 />
      <Section3 />
      <Section4 />
    </div>
  )
}

export default Home