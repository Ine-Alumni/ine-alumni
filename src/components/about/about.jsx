import React from 'react';

const AboutUs = () => {
    return(
        <section className="relative py-20 px-[8vw] min-h-screen items-center">
        <div className="absolute inset-0 -translate-y-40">
          <img src="/assets/illustration.png
          " alt="illustration" className="w-full h-full object-cover opacity-20" />
        </div>

      
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-4 text-center">À propos</h2>


        <h3 className="text-xl text-[#34699A] font-bold mb-2 ml-60">Notre mission</h3>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative z-10 bg-white shadow-md p-4 rounded border flex flex-col w-[800px] h-[8.5rem] mx-auto">
            <p className="text-gray-700 mb-2">
              IA (Ine Alumni) est une plateforme collaborative créée pour renforcer les liens entre les
              différentes générations d’étudiants et diplômés de l’INPT. Notre objectif est de bâtir une
              communauté solidaire, dynamique et connectée autour de valeurs d’entraide, de partage et
              de réussite.
              À travers cette initiative, nous poursuivons plusieurs objectifs clés.
            </p>
          </div>
        </div>


        <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 gap-8 ">

        {/* Niveau 1 : Card 1, centrée */}
        <div className="w-64 h-[12.5rem] bg-white shadow-md rounded border flex flex-col relative z-10 items-center justify-center">
          <img src='../../public/assets/icons/key.svg' alt='key icon' className='mb-3 mt-2 mx-auto' />
          <p className="text-center px-4">• Faciliter l’accès aux opportunités professionnelles (emplois, stages, mentorat).</p>
        </div>

        {/* Niveau 2 : Deux cards côte à côte */}
        <div className="flex gap-70">
          <div className="relative z-10 w-64 h-[12.5rem] bg-white shadow-md rounded border flex flex-col  items-center justify-center">
            <img src='../../public/assets/icons/mortarboard.svg' alt='mortarboard icon' className='w-10 h-10 mx-auto' />
            <p className="text-center px-4">• Accompagner les étudiants dans leur parcours académique et leur insertion professionnelle.</p>
          </div>
          <div className="relative z-10 w-64 h-[12.5rem] bg-white shadow-md rounded border flex flex-col items-center justify-center">
            <img src='../../public/assets/icons/world.svg' alt='world icon' className='w-10 h-10 mb-3 mt-2 mx-auto'/>
            <p className="text-center px-4">• Renforcer le sentiment d’appartenance à la communauté INPT.</p>
          </div>
        </div>

        {/* Niveau 3 : Card 4, centrée */}
        <div className="relative z-10 w-64 h-[12.5rem] bg-white shadow-md rounded border flex flex-col items-center justify-center">
          <img src='../../public/assets/icons/clapper.svg' alt='clapperboard' className='w-10 h-10 mb-5 mx-auto'/>
          <p className="text-center px-4">• Promouvoir les rencontres et les événements entre membres.</p>
        </div>
        
      </div>





        <h3 className="text-xl text-[#34699A] font-bold mb-2 ml-55">Notre vision</h3>
        <div className='relative py-20 px-[8vw] min-h-screen items-center -mt-20'>
            <div className='relative z-10 bg-white shadow-md p-4 rounded border flex flex-col w-[800px] h-[8.5rem] mx-auto'>
                <p className="text-gray-700 ">
                Construire un réseau solide d’alumni et d’étudiants à travers une plateforme interactive
                qui centralise les opportunités de stages, d’emplois et de mentorat, offre un espace riche
                en ressources (articles, vidéos, Q&R, témoignages) et propose un calendrier des événements
                pour renforcer l’engagement communautaire.
                </p>
            </div>
        </div>
      </div>
    </section>
    )
}

export default AboutUs;