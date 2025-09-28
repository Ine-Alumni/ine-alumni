import React from 'react'
import MergedSection1 from './MergedSection1'
import MergedSection2 from './MergedSection2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6';
import { useAuth } from '../authentication/AuthenticationProvider'

const Home = () => {
  const {auth} = useAuth();

  return (
    <div className='pb-20'>
      <Section1 />
      <Section2 />
      {auth && <Section3/>}
      <Section4/>
      <Section5 />
      <Section6/>
    </div>
  )
}

export default Home