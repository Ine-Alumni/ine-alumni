const StatsSection = () => {
  const stats = [
    { number: "2500+", label: "Anciens" },
    { number: "20+", label: "Clubs étudiants actifs" },
    { number: "100+", label: "Événements par an" },
    { number: "95%", label: "Diplômés restés en contact" },
  ];

  return (
    <section id="section2" className="my-10 flex items-start justify-center px-4 py-12">
      <div className="max-w-6xl w-full mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-[#3A7FC2]">Quelques chiffres</h2>
          <div className="mt-2 flex items-center justify-center">
            <span className="block w-16 h-1 bg-[#3A7FC2] rounded" />
          </div>
          <p className="text-sm text-gray-700 mt-3 max-w-xl mx-auto">La communauté INE‑Alumni en un coup d'œil</p>
        </div>

        {/* Auto-fit responsive grid so cards size nicely on all screens */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr items-stretch">
          {stats.map((stat, index) => (
            <div
              key={index}
              role="article"
              tabIndex={0}
              className="bg-white text-center flex flex-col items-center justify-center
                         w-full rounded-[18px] p-6 mx-auto
                         shadow-[0_6px_18px_rgba(0,0,0,0.05)]
                         hover:shadow-[0_10px_26px_rgba(0,0,0,0.06)]
                         hover:-translate-y-1 hover:scale-[1.01]
                         focus:outline-none focus:ring-2 focus:ring-[#3A7FC2]/20
                         transition-transform duration-200"
            >
              <div className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#3A7FC2] leading-none">
                {stat.number}
              </div>

              <div className="mt-3 text-sm sm:text-base text-gray-700 font-medium leading-6 text-center px-2">
                {stat.label}
              </div>

              <div className="w-14 h-1 bg-[#3A7FC2] rounded mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
