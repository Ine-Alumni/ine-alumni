import { ArrowDownCircle } from "lucide-react";

const Section1 = () => {
  return (
    <section
      className="w-full bg-gradient-to-r from-[#0C5F95] via-[#5197C5] to-[#3178A7]"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Images area */}
          <div className="w-full lg:w-1/2">
            {/* Layout behaviour:
                - mobile: stacked (main then smalls)
                - md (tablet): main left (2/3) and smalls stacked on the right (1/3)
                - lg (large screens): column -- main full width on top, two smalls side-by-side below */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-4 items-stretch max-lg:w-[95%] mx-auto">
              {/* Main image */}
              <div className="w-full md:w-2/3 lg:w-full rounded-lg overflow-hidden shadow-lg aspect-video">
                <img
                  src="assets/inpt1.jpg"
                  alt="Photo principale du campus"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Small images:
                  - md: stacked vertically on the right
                  - lg: full width container with small images in a row (two columns) */}
              <div className="w-full md:w-1/3 lg:w-full flex flex-row md:flex-col lg:flex-row gap-4">
                <div className="flex-1 rounded-lg overflow-hidden shadow-md aspect-video">
                  <img
                    src="assets/inpt2.jpg"
                    alt="Photo du campus - détail 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 rounded-lg overflow-hidden shadow-md aspect-video">
                  <img
                    src="assets/inpt3.jpg"
                    alt="Photo du campus - détail 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text area */}
          <div className="max-lg:w-[90%] lg:w-1/2 text-white">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight">
              Bienvenue Sur
              La Plateforme Ine‑Alumni
              De L'INPT
            </h1>

            {/* Increased size and weight for the intro, larger emphasis on the alumni count */}
            <p className="mt-4 sm:mt-6 text-lg md:text-xl lg:text-[20px] text-[#E6F2FF] max-w-xl leading-relaxed">
              
            Connectez-vous à
            <span className="font-extrabold text-lg md:text-xl ml-1">plus de 2500 anciens diplômés</span>. 
            Élargissez votre réseau professionnel et
            découvrez des opportunités uniques et restez au cœur de votre communauté.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("section2")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center justify-center gap-3 bg-white text-[#0C5F95] font-medium rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-sm hover:bg-gray-100 transition"
                aria-label="Explorer"
              >
                <ArrowDownCircle className="w-6 h-6" />
                <span className="text-base">Explorer</span>
              </button>

              
            </div>

            {/* Larger, slightly more prominent italic tagline */}
            <p className="mt-5 text-base md:text-lg text-[#DBEAFE] opacity-95 max-w-md italic">
              « Connectez-vous aux ingénieurs de votre école et propulsez votre avenir. »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
