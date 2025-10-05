import React from "react";
import { BookOpen, GraduationCap, Calendar } from "lucide-react";

const Section3 = () => {

  const cardsData = [
    {
      icon: <BookOpen className="text-[#3A7FC2] w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Annuaire des Entreprises",
      description: "Consultez le répertoire d'entreprises de marché.",
      link: "/entreprises",
    },
    {
      icon: <GraduationCap className="text-[#3A7FC2] w-10 h-10 sm:w-12 sm:h-12" />,
      title: "Annuaire des Lauréats",
      description: "Retrouvez et connectez-vous avec les anciens de INPT.",
      link: "/laureats",
    },
    {
      icon: <Calendar className="text-[#3A7FC2] w-10 h-10 sm:w-12 sm:h-12" />,
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
            Plateforme de networking pour les étudiants de l'INPT
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            Un pont entre les promotions — partagez vos expériences, trouvez des mentors et progressez ensemble.
          </p>
        </div>

        {/* Cards Section */}
        <div className="w-full max-w-7xl">
          {/* Unified responsive grid: 1 / 2 / 3 columns */}
          <div className="flex flex-wrap gap-13 max-md:gap-8 justify-center">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-[18px] shadow-[0_6px_18px_rgba(0,0,0,0.05)]
                           flex flex-col items-center p-6 hover:-translate-y-1 transition-transform duration-300
                           w-120 max-w-sm min-h-[252px] text-center"
              >
                <div className="flex-shrink-0 mb-4">
                  {card.icon}
                </div>

                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">{card.title}</h2>
                  <p className="text-[#031A2A] flex-1 mb-0 px-2 text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 w-full flex justify-center">
                  <button
                    onClick={() => (window.location.href = card.link)}
                    className="w-full sm:w-auto max-w-xs bg-[#3A7FC2] hover:bg-[#2c6aab] text-white
                               font-medium py-2 px-6 rounded-lg transition-colors duration-200
                               text-sm sm:text-base hover:shadow-lg cursor-pointer"
                  >
                    Consulter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;