import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Section5 = () => {
    const clubs = [
      { src: 'assets/club1.png', name: 'A25 Club' },
      { src: 'assets/club2.png', name: 'GameLab INPT' },
      { src: 'assets/club3.png', name: 'IEEE NPT Student Branch' },
    ];

    return (
        <section className="pb-2 pt-0 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto text-center">

                {/* Header */}
                <div className="text-center mb-6 mt-3">
                  <h2 className="text-3xl font-black text-[#3A7FC2]">Clubs</h2>
                  <div className="mt-2 flex items-center justify-center">
                    <span className="block w-16 h-1 bg-[#3A7FC2] rounded" />
                  </div>
                  <p className="text-sm text-gray-700 mt-3 max-w-xl mx-auto">
                    Découvrez les clubs étudiants et rejoignez la communauté
                  </p>
                </div>

                {/* Clubs Grid */}
                <div className="mb-8 sm:mb-10 md:mb-20 mt-12">
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-15">
                    {clubs.map((club, i) => (
                      <div
                        key={i}
                        role="article"
                        tabIndex={0}
                        className="bg-white rounded-[18px] p-6 flex flex-col items-center justify-center text-center
                                   shadow-[0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.08)]
                                   hover:-translate-y-1 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#3A7FC2]/20
                                   w-120 max-w-sm md:w-100 lg:w-[400px] xl:w-[380px]"
                      >
                        <div className="w-full flex items-center justify-center mb-4">
                          <img 
                            src={club.src} 
                            alt={club.name} 
                            className="w-28 sm:w-32 md:w-36 h-auto object-contain" 
                          />
                        </div>
                        <div className="text-[#2c6aab] font-medium text-lg sm:text-xl">
                          {club.name}
                        </div>
                        <div className="w-14 h-1 bg-[#3A7FC2] rounded mt-4" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Link 
                        to="/clubs" 
                        className="inline-flex items-center gap-2 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white font-medium 
                                   px-4 sm:px-6 py-3 rounded-lg transition-transform duration-200"
                    >
                        Voir tous les clubs
                        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default Section5;
