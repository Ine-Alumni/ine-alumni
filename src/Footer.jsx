import React from 'react'
import { Link } from 'react-router'
import { useAuth } from './components/authentication/AuthenticationProvider' 
import { Home, Calendar, Briefcase, GraduationCap, Building, BookOpen } from 'lucide-react'

const Footer = () => {
  const { auth } = useAuth()

  return (
    <div className='bg-[#053A5F] px-[12vw] pt-11 pb-6 text-white'>
      <div className='flex gap-8 justify-between flex-wrap gap-y-6'>
        <div>
          <img src="/assets/ine_alumni_white.png" alt="ine alumni logo" className='h-20'/>
          {/* <h1 className='mt-4 text-xl font-bold'>Ine Alumni</h1> */}
          <p className='max-w-45 text-sm mt-5'>Votre réseau professionnel commence ici.</p>
        </div>
        
        <div>
          <h1 className='font-bold'>Liens rapides</h1>
          <div className='flex gap-8'>
            <div>
              <Link to='/' className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <Home className='w-4 h-4' /> Accueil
              </Link>
              
              <Link to={'/evenements' } className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <Calendar className='w-4 h-4' /> Événements
              </Link>
              
              <Link to={'/jobs' } className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <Briefcase className='w-4 h-4' /> Offres
              </Link>
            </div>
            
            <div>
              <Link to={'/laureats' } className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <GraduationCap className='w-4 h-4' /> Laureats
              </Link>
              
              <Link to={'/entreprises' } className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <Building className='w-4 h-4' /> Entreprises
              </Link>
              
              <Link to={'/ressources/textuelles' } className='flex items-center gap-2 mt-2 text-sm hover:underline'>
                <BookOpen className='w-4 h-4' /> Ressources
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className='font-bold'>Contact</h1>
          <a href='tel:212512345678' className='mt-2 block underline'>+212 5 12 34 56 78</a>
          <a href='mailto:info@inealumni.ac.ma' className='mt-0 underline'>info@inealumni.ac.ma</a>
        </div>
      </div>
      <div className='h-[1px] bg-slate-200 w-[76vw] text-center mt-8'></div>
      <p className='mt-4 text-gray-300 text-sm text-center'>&#169; 2025 INPT ALUMNI. Tous droits réservés.</p>
    </div>
  )
}

export default Footer