import React, { useState } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import Alerts from './components/alerts/Alerts';

export const AlertContext = React.createContext();

const SharedLayout = () => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (success, description) => {
        setAlerts([...alerts, {success, description}]);

        setTimeout(() => {
            setAlerts((prevAlerts) => prevAlerts.slice(1));
        }, 10000);
    }

    return (
        <AlertContext.Provider value={{addAlert}}>
            <main className='mt-16'>
                <NavBar />
                <div className='min-h-[calc(100vh-373px)]'>
                    <Outlet />
                </div>
                <Footer />
                <Alerts alerts={alerts}/>
            </main>
        </AlertContext.Provider>
      )
    }
    
export default SharedLayout;