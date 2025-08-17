import React from 'react'
import MergedNavbar from '../MergedNavbar'
import Footer from '../Footer'
import { Outlet } from 'react-router'

const SharedLayout = () => {
  return (
    <main className='mt-16'>
      <MergedNavbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default SharedLayout