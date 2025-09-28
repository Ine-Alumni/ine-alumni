const Section2 = () => {
  const stats = [
    { number: "2500+", label: "Alumni" },
    { number: "20+", label: "Active Student Clubs" },
    { number: "100+", label: "Events Every Year" },
    { number: "95%", label: "of graduates stay connected" },
  ];

  return (
    <section id="section2" className=" my-10  flex items-start justify-center px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white text-center flex flex-col items-center justify-center
                      w-full max-w-[298px] aspect-[298/159] rounded-[18px] mx-auto
                      shadow-[0_8px_15px_rgba(0,0,0,0.07)] hover:-translate-y-2 transition-transform"
          >

            <div className="text-2xl sm:text-xl md:text-2xl lg:text-[2rem] font-bold text-[#3A7FC2] leading-none">
              {stat.number}
            </div>

            <div className="text-[#3A7FC2] font-medium text-sm sm:text-xs md:text-sm lg:text-base mt-2 leading-5 text-center px-2">
              {stat.label}
            </div>

            <div className="w-12 h-1 bg-[#3A7FC2] rounded mt-2"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
