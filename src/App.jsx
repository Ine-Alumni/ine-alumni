import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import SharedPrivateLayout from './sharedlayout/SharedPrivateLayout'
import SharedPublicLayout from './sharedlayout/SharedPublicLayout'
import PublicHome from './components/home/PublicHome'
import PrivateHome from './components/home/PrivateHome'
import Evenements from './components/evenements/Evenements'
import Emplois from './components/emplois/Emplois'
import Stages from './components/stages/Stages'
import Entreprises from './components/entreprises/Entreprises'
import Laureats from './components/laureats/Laureats'
import Ressources from './components/ressources/Ressources'
import Questions from'./components/questions/Questions'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import About from './components/about/About'
import Contactus from './components/contactus/Contactus'
import Profile from './components/profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const isAuthenticated = true;

  return (
    <Routes>

      <Route path="/" element={<SharedPublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="se-connecter" element={<Login />} />
        <Route path="nouveau-compte" element={<Signup />} />
        <Route path="about" element={<About />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="*" element={<div>404 Not found</div>} />
      </Route>

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/private-home" element={<SharedPrivateLayout />}>
          <Route index element={<PrivateHome />} /> 
          <Route path="evenements" element={<Evenements />} />
          <Route path="emplois" element={<Emplois />} />
          <Route path="stages" element={<Stages />} />
          <Route path="entreprises" element={<Entreprises />} />
          <Route path="laureats" element={<Laureats />} />
          <Route path="ressources" element={<Ressources />} />
          <Route path="questions" element={<Questions />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
