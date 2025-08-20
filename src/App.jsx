import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import SharedLayout from './SharedLayout'
import Home from './components/home/Home'
import Jobs from './components/offers/jobs'
import Evenements from './components/evenements/Evenements'
import Enreprises from './components/entreprises/Entreprises'
import Laureats from './components/laureats/Laureats'
import Ressources from './components/ressources/Ressources'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'


function App() {

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />}/>
        <Route path="evenements" element={<Evenements />}/>
        <Route path="jobs" element={<Jobs />}/>
        <Route path="entreprises" element={<Enreprises/>}/>
        <Route path="laureats" element={<Laureats />}/>
        <Route path="ressources" element={<Ressources />}/>
        <Route path="se-connecter" element={<Login />}/>
        <Route path="nouveau-compte" element={<Signup />}/>
        <Route path="*" element={<div>404 Not found</div>}></Route>
      </Route>
    </Routes>
  )
}

export default App