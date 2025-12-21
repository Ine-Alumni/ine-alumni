import {React, useEffect } from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6';
import { useAuth } from '../authentication/AuthenticationProvider'
import { useLoader } from "../loader/LoaderContext";


const Home = () => {
  const {auth} = useAuth();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader(); 
    const timer = setTimeout(() => {
      hideLoader();
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='pb-20'>
      <Section1 />
      <Section2 />
      <Section3/>
      <Section4/>
      <Section5 />
      <Section6/>
    </div>
  )
}

export default Home