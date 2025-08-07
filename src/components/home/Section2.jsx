import React from 'react'
import { Link } from 'react-router'


const Section2 = () => {
    return (
        <div>

            <h1 className='text-3xl font-extrabold text-[#34699A] mt-14 text-center'>Opportunités et Événements</h1>

            <div className='mt-16 mx-[12vw] flex flex-wrap gap-y-12 gap-12 justify-center '>
                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src='/assets/icons/education.svg'alt=" education Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">Offres de Stage</h3>
                    <p className="text-sm text-gray-700 mb-4">Accédez aux opportunités de stages.</p>
                    <Link to='/' className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Voir les offres</Link>
                </div>

                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src='/assets/icons/education2.svg'alt=" education Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">Offres d'Emploi</h3>
                    <p className="text-sm text-gray-700 mb-4">Découvrez les opportunités d'emploi pour les jeunes diplômés</p>
                    <Link to='/' className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Explorer les offres</Link>
                </div>

                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src='/assets/icons/education3.svg'alt=" education Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">Événements</h3>
                    <p className="text-sm text-gray-700 mb-4">Calendrier des activités et événements de l'INPT.</p>
                    <Link to='/' className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Voir le calendrier</Link>
                </div>


            </div>

            <h1 className='text-3xl font-extrabold text-[#34699A] mt-14 text-center'>Ressources et Annuaires</h1>

            <div className="mt-10 mx-[12vw] flex flex-wrap gap-y-12 gap-12 justify-center">

                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src="/assets/icons/education4.svg" alt=" education4 Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">Bibliothèque en Ligne</h3>
                    <p className="text-sm text-gray-700 mb-4">Accédez à notre collection de ressources pédagogiques.</p>
                    <Link to="/" className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Voir les ressources</Link>
                </div>

                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src="/assets/icons/education.svg" alt=" education Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">Annuaire des Lauréats</h3>
                    <p className="text-sm text-gray-700 mb-4">Retrouvez et connectez-vous avec les anciens de l'INPT.</p>
                    <Link to="/" className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Explorer</Link>
                </div>

                <div className="w-72 bg-white shadow-md rounded-lg border p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
                    <img src="/assets/icons/education2.svg" alt=" education4 Icone" className="w-10 h-10 mb-4"/>
                    <h3 className="text-lg font-bold mb-2">"Annuaire des Entreprises"</h3>
                    <p className="text-sm text-gray-700 mb-4">Consultez le répertoire d’entreprises de marché.</p>
                    <Link to="/" className="border-2 border-[#34699A] text-[#34699A] px-4 py-1 rounded font-semibold hover:bg-[#34699A] hover:text-white transition">Consulter</Link>
                </div>

            </div>

        </div>
    )
}

export default Section2