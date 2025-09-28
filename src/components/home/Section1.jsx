import { ArrowDownCircle } from "lucide-react";

const Section1 = () => {
  return (
    <section
      className="relative w-full h-full"
      style={{
        background:
          "linear-gradient(90deg, #0C5F95 0%, #4188B6 19%, #5197C5 56%, #4990BE 85%, #3178A7 100%)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-[72px] pt-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-30 max-md:gap-10">
          <div className="flex gap-4 md:gap-8 items-end">
            <div className="flex flex-col gap-4 md:gap-6 justify-end">
              <div className="w-[150px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-[220px] sm:h-[330px] md:h-[380px] lg:h-[442px] overflow-hidden shadow-md">
                <img
                  src="assets/inpt2.jpg"
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[150px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-[100px] sm:h-[130px] md:h-[150px] lg:h-[150px] overflow-hidden shadow-md">
                <img
                  src="assets/inpt3.jpg"
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-[180px] sm:w-[280px] md:w-[340px] lg:w-[400px] h-[300px] sm:h-[420px] md:h-[500px] lg:h-[615px] overflow-hidden shadow-lg">
              <img
                src="assets/inpt1.jpg"
                alt="placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-white flex-1 max-w-lg text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold leading-tight tracking-wide">
              <span className="block">WELCOME TO</span>
              <span className="whitespace-nowrap"> INPT INE-ALUMNI</span>
              <span className="block">PLATFORM</span>
            </h1>

            <p className="mt-6 md:mt-8 lg:mt-12 text-base sm:text-lg md:text-xl lg:text-[30px] text-left tracking-widest">
              
                Your perfect place to
              
              <br className="hidden sm:block" />
              
                create <span className="font-semibold">connections</span> with
              
              <br />
              
              more than <span className="font-extrabold">2500+ Alumni</span>
              
            </p>

            <div className="mt-8 md:mt-7 flex items-center justify-start">
              <button
                onClick={() => {
                  document
                    .getElementById("section2")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center bg-white text-[#3A7FC2] text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold rounded-full px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-100 transition-colors w-[220px] sm:w-[280px] md:w-[250px] lg:w-[300px] h-[55px] sm:h-[60px] md:h-[60px] lg:h-[60px]"
              >
                <ArrowDownCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
                <span className="flex-1 text-center">Explore</span>
                <ArrowDownCircle className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
              </button>
            </div>

            <p className="mt-6 md:mt-6 text-sm sm:text-base md:text-[16px] text-[#DBEAFE] opacity-100 text-center lg:text-left mb-6 ">
              "Connecting Generations of Students, Building a Stronger Future Together"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
