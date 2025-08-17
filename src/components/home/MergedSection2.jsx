import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../AuthContext'

const MergedSection2 = () => {
  const { isAuthenticated } = useAuth();
  const baseLink = isAuthenticated ? '/private-home' : '/';
  const color = '#0C5F95';

  // Function to render CTA button based on auth status
  const renderCTA = (link, authenticatedText, unauthenticatedText) => {
    if (isAuthenticated) {
      return (
        <Link 
          to={`${baseLink}${link}`} 
          className="border-2 px-4 py-1 rounded font-semibold text-[#0C5F95] transition hover:bg-[#0C5F95] hover:text-white"
          style={{ borderColor: color }}
        >
          {authenticatedText}
        </Link>
      );
    } else {
      return (
        <Link 
          to="/se-connecter" 
          className="border-2 px-4 py-1 rounded font-semibold text-[#0C5F95] transition hover:bg-[#0C5F95] hover:text-white"
          style={{ borderColor: color }}
        >
          {unauthenticatedText}
        </Link>
      );
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-extrabold mt-14 text-center text-[#0C5F95]'>
        Opportunités et Événements
      </h1>

      <div className='mt-16 mx-[12vw] flex flex-wrap gap-y-12 gap-12 justify-center'>
        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src='/assets/icons/education.svg' alt="education Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Offres de Stage</h3>
          <p className="text-sm text-gray-700 mb-4">Accédez aux opportunités de stages.</p>
          {renderCTA('/stages', 'Voir les offres', 'Se connecter')}
        </div>

        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src='/assets/icons/education2.svg' alt="education Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Offres d'Emploi</h3>
          <p className="text-sm text-gray-700 mb-4">Découvrez les opportunités d'emploi pour les jeunes diplômés</p>
          {renderCTA('/emplois', 'Explorer les offres', 'Se connecter')}
        </div>

        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src='/assets/icons/education3.svg' alt="education Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Événements</h3>
          <p className="text-sm text-gray-700 mb-4">Calendrier des activités et événements de l'INPT.</p>
          {renderCTA('/evenements', 'Voir le calendrier', 'Se connecter')}
        </div>
      </div>

      
      <h1 className='text-3xl font-extrabold mt-14 text-center' style={{ color }}>
        Ressources et Annuaires
      </h1>

      <div className="mt-10 mx-[12vw] flex flex-wrap gap-y-12 gap-12 justify-center">
        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src="/assets/icons/education4.svg" alt="education4 Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Bibliothèque en Ligne</h3>
          <p className="text-sm text-gray-700 mb-4">Accédez à notre collection de ressources pédagogiques.</p>
          {renderCTA('/ressources', 'Voir les ressources', 'Se connecter')}
        </div>

        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src="/assets/icons/education.svg" alt="education Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Annuaire des Lauréats</h3>
          <p className="text-sm text-gray-700 mb-4">Retrouvez et connectez-vous avec les anciens de l'INPT.</p>
          {renderCTA('/laureats', 'Explorer', 'Se connecter')}
        </div>

        <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
          <img src="/assets/icons/education2.svg" alt="education4 Icon" className="w-10 h-10 mb-4"/>
          <h3 className="text-lg font-bold mb-2">Annuaire des Entreprises</h3>
          <p className="text-sm text-gray-700 mb-4">Consultez le répertoire d'entreprises de marché.</p>
          {renderCTA('/entreprises', 'Consulter', 'Se connecter')}
        </div>
      </div>
    </div>
  )
}

export default MergedSection2