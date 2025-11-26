import React from 'react'
import HeaderSection from './HeaderSection'
import StatsSection from './StatsSection'
import DirectoriesSection from './DirectoriesSection'
import EventsSection from './EventsSection'
import ClubsSection from './ClubsSection'
import QuoteSection from './QuoteSection';


const Home = () => {

  return (
    <div className='pb-20'>
      <HeaderSection />
      <StatsSection />
      <DirectoriesSection/>
      <EventsSection/>
      <ClubsSection />
      <QuoteSection/>
    </div>
  )
}

export default Home