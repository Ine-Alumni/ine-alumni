import React from "react";
import { BookOpen, GraduationCap, Calendar } from "lucide-react";

const Section3 = () => {

  const cardsData = [
    {
      icon: <BookOpen size={40} className="text-black" />,
      title: "Annuaire des Entreprises",
      description: "Consultez le répertoire d'entreprises de marché.",
      link: "/entreprises",
    },
    {
      icon: <GraduationCap size={40} className="text-black" />,
      title: "Annuaire des Lauréats",
      description: "Retrouvez et connectez-vous avec les anciens de INPT.",
      link: "/laureats",
    },
    {
      icon: <Calendar size={40} className="text-black" />,
      title: "Événements",
      description: "Découvrez et participez aux événements organisés par INPT.",
      link: "/evenements",
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-18 bg-white">
      <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-[100px]">
        
        {/* Header Section */}
        <div className="bg-[#1AA5FF]/10 rounded-[18px] text-center px-8 py-6 w-full mx-9">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Plateforme de n etworking pour les étudiants de INPT
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            A bridge between past and present students — share experiences, find
            mentors, and grow together.
          </p>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-7xl">
          {/* Mobile: Stacked Layout */}
          <div className="flex flex-col gap-8 sm:gap-10 md:hidden">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] mx-auto 
                          shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                          flex flex-col items-center text-center 
                          p-4 sm:p-6 
                          hover:-translate-y-2 transition-transform duration-300
                          w-full max-w-sm
                          min-h-[220px] sm:min-h-[252px]"
              >
                <div className="mb-3 sm:mb-4 flex-shrink-0">
                  {React.cloneElement(card.icon, { 
                    size: window.innerWidth < 640 ? 32 : 40 
                  })}
                </div>

                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {card.title}
                </h2>

                <p className="text-[#031A2A] flex-grow mb-4 sm:mb-6 px-2 
                            text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>

                <button
                  onClick={() => (window.location.href = card.link)}
                  className="bg-[#3A7FC2] hover:bg-[#2c6aab] text-white 
                            font-medium py-2 sm:py-2.5 px-6 sm:px-8 
                            rounded-lg transition-colors duration-200
                            text-sm sm:text-base
                            hover:shadow-lg transform hover:scale-105"
                >
                  Consulter
                </button>
              </div>
            ))}
          </div>

          {/* Tablet: 2x1 + 1 Layout */}
          <div className="hidden md:flex lg:hidden flex-wrap justify-center gap-8 md:gap-10">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] flex flex-col items-center text-center p-6 hover:-translate-y-2 transition-transform duration-300 ${index < 2 ? 'w-[45%] min-w-[300px]' : 'w-[45%] min-w-[300px] md:w-[300px]'} min-h-[252px]`}
              >
                <div className="mb-4 flex-shrink-0">{card.icon}</div>

                <h2 className="text-xl font-semibold mb-2">
                  {card.title}
                </h2>

                <p className="text-[#031A2A] flex-grow mb-6 px-2 leading-relaxed">
                  {card.description}
                </p>

                <button
                  onClick={() => (window.location.href = card.link)}
                  className="bg-[#3A7FC2] hover:bg-[#2c6aab] text-white font-medium py-2 px-8 rounded-lg transition-colors duration-200 hover:shadow-lg transform hover:scale-105">
                  Consulter
                </button>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:flex justify-center gap-8 xl:gap-12 2xl:gap-16 w-full">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] 
                          shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                          flex flex-col items-center text-center 
                          p-6 hover:-translate-y-2 transition-transform duration-300
                          w-[300px] lg:w-[350px] xl:w-[405px]
                          h-[252px]"
              >
                <div className="mb-4 flex-shrink-0">{card.icon}</div>

                <h2 className="text-lg lg:text-xl font-semibold mb-2">
                  {card.title}
                </h2>

                <p className="text-[#031A2A] flex-grow mb-6 px-2 
                            text-sm lg:text-base leading-relaxed">
                  {card.description}
                </p>

                <button
                  onClick={() => (window.location.href = card.link)}
                  className="bg-[#3A7FC2] hover:bg-[#2c6aab] text-white 
                            font-medium py-2 px-6 lg:px-8 
                            rounded-lg transition-colors duration-200
                            text-sm lg:text-base
                            hover:shadow-lg transform hover:scale-105"
                >
                  Consulter
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;