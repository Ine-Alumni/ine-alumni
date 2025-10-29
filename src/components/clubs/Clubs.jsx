/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clubsData } from "./ClubData";
import ClubDetails from "./ClubDetails";

const sortedClubs = [...clubsData].sort((a, b) =>
  a.title.localeCompare(b.title),
);

function Clubs() {
  const [selectedClub, setSelectedClub] = useState(sortedClubs[0]);
  const [open, setOpen] = useState(window.innerWidth >= 768); // true on desktop
  const [search, setSearch] = useState("");

  // Auto-close/open sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
      else setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredClubs = sortedClubs.filter((club) =>
    club.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative flex min-h-screen bg-gray-50 p-4 md:p-6 gap-4 transition-all duration-300">
      {/* Toggle button (mobile only) */}
      {!open && (
        <div className="absolute z-50 top-2 left-2">
          <button
            className="md:hidden bg-blue-500 text-white p-2 rounded-lg z-50"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        className={`bg-white shadow-lg rounded-2xl overflow-hidden relative md:static ${
          open ? "w-56" : "w-0 md:w-56 hidden"
        } transition-all duration-100`}
      >
        {/* Close button inside sidebar (mobile) */}
        <button
          className="md:hidden absolute top-2 left-2 bg-blue-500 text-white p-2 rounded-lg z-50"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Search + Clubs list */}
        <div className="p-4 pt-14 md:pt-4">
          {" "}
          {/* Added pt-14 to create gap below toggle */}
          <input
            type="text"
            placeholder="Rechercher un club..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="space-y-2">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                onClick={() => setSelectedClub(club)}
                className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${
                  club.id === selectedClub.id
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  {club.title[0]}
                </span>
                <span>{club.title}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Right content */}
      <div className="flex-1 transition-all duration-300">
        <ClubDetails club={selectedClub} />
      </div>
    </div>
  );
}

export default Clubs;
