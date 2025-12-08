import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X, Menu } from "lucide-react";
import { clubsData } from "./ClubData";
import ClubDetails from "./ClubDetails";
import ClubList from "./ClubList";

const sortedClubs = [...clubsData].sort((a, b) =>
  a.title.localeCompare(b.title),
);

function Clubs() {
  const [selectedClub, setSelectedClub] = useState(sortedClubs[0]);
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
      else setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredClubs = sortedClubs.filter((club) =>
    club.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex gap-4">
        {/* Toggle button (mobile only) */}
        {!open && (
          <button
            className="fixed top-4 left-4 z-50 md:hidden bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: open ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
          className={`bg-white rounded-lg shadow fixed md:sticky top-4 h-[calc(100vh-2rem)] z-40 ${
            open ? "w-64" : "w-0 -ml-64 md:ml-0 md:w-64"
          } transition-all duration-300 overflow-hidden`}
        >
          {/* Header with close button */}
          
<div className="relative p-4 border-b md:border-b-0">
  <h2 className="font-bold text-xl text-gray-900 text-center">Clubs</h2>
  <button
    className="md:hidden text-gray-500 hover:text-gray-700 p-1 absolute right-4 top-1/2 -translate-y-1/2"
    onClick={() => setOpen(false)}
  >
    <X className="w-5 h-5" />
  </button>
</div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
          </div>

          {/* Clubs list */}
          <div className="px-4 pb-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 10rem)" }}>
            <ClubList
              filteredClubs={filteredClubs}
              selectedClubId={selectedClub.id}
              onSelectedClub={(club) => {
                setSelectedClub(club);
                if (window.innerWidth < 768) setOpen(false);
              }}
            />
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 transition-all duration-300">
          <ClubDetails club={selectedClub} />
        </div>
      </div>
    </div>
  );
}

export default Clubs;