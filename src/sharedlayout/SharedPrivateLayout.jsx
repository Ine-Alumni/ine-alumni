import React from 'react'
import PrivateNavBar from '../PrivateNavBar';
import Footer from '../Footer';
import { Outlet } from 'react-router';

const SharedLayout = () => {
    return (
        <main className='mt-16'>
            <PrivateNavBar />
            <Outlet/>
            <Footer />
        </main>
    )
    }
    
export default SharedLayout;