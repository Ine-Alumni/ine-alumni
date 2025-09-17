import React from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

const Section5 = () => {
    return(
        <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto text-center">

                {/* Header */}
                <h2 className="font-bold text-gray-800 
                              text-xl sm:text-2xl md:text-3xl lg:text-[30px] 
                              mb-8 sm:mb-10 md:mb-12">
                    Clubs
                    <div className="w-[80px] sm:w-[95px] md:w-[110px] 
                                   h-0.5 bg-black mx-auto 
                                   mt-2 sm:mt-2.5 md:mt-3"></div>
                </h2>

                {/* Clubs Grid */}
                <div className="mb-8 sm:mb-10 md:mb-12">
                    
                    {/* Mobile: Single Column */}
                    <div className="flex flex-col items-center gap-6 sm:gap-8 md:hidden">
                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[200px] sm:w-[240px] 
                                           h-[200px] sm:h-[240px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club1.png" alt="A25 Club" 
                                     className="w-24 sm:w-28 h-24 sm:h-28 object-contain" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[200px] sm:w-[240px] 
                                           h-[200px] sm:h-[240px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club2.png" alt="GameLab INPT" 
                                     className="w-24 sm:w-28 h-24 sm:h-28 object-contain" /> 
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[200px] sm:w-[240px] 
                                           h-[200px] sm:h-[240px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club3.png" alt="IEEE NPT Student Branch" 
                                     className="w-24 sm:w-28 h-24 sm:h-28 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Tablet: 2+1 Layout */}
                    <div className="hidden md:flex lg:hidden flex-wrap justify-center gap-6 md:gap-8">
                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[280px] h-[280px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club1.png" alt="A25 Club" 
                                     className="w-32 h-32 object-contain" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[280px] h-[280px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club2.png" alt="GameLab INPT" 
                                     className="w-32 h-32 object-contain" /> 
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300 
                                       w-full md:w-auto justify-center mt-6">
                            <div className="w-[280px] h-[280px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club3.png" alt="IEEE NPT Student Branch" 
                                     className="w-32 h-32 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Horizontal Layout */}
                    <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 2xl:gap-16">
                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[300px] lg:w-[330px] xl:w-[363px] 
                                           h-[300px] lg:h-[330px] xl:h-[363px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club1.png" alt="A25 Club" 
                                     className="w-40 lg:w-44 xl:w-48 h-40 lg:h-44 xl:h-48 object-contain" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[300px] lg:w-[330px] xl:w-[363px] 
                                           h-[300px] lg:h-[330px] xl:h-[363px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club2.png" alt="GameLab INPT" 
                                     className="w-40 lg:w-44 xl:w-48 h-40 lg:h-44 xl:h-48 object-contain" /> 
                            </div>
                        </div>

                        <div className="flex flex-col items-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-[300px] lg:w-[330px] xl:w-[363px] 
                                           h-[300px] lg:h-[330px] xl:h-[363px] 
                                           flex items-center justify-center bg-white 
                                           rounded-[18px] shadow-[0_8px_15px_rgba(0,0,0,0.25)] 
                                           hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] 
                                           transition-shadow duration-300">
                                <img src="assets/club3.png" alt="IEEE NPT Student Branch" 
                                     className="w-40 lg:w-44 xl:w-48 h-40 lg:h-44 xl:h-48 object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Link to="/clubs" 
                          className="bg-[#3A7FC2] hover:bg-[#2c6aab] text-white font-medium 
                                   px-6 sm:px-8 py-2.5 sm:py-3 
                                   flex items-center gap-2 rounded-lg 
                                   transition-all duration-200
                                   text-sm sm:text-base
                                   hover:shadow-lg transform hover:scale-105">
                        Discover more
                        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default Section5;