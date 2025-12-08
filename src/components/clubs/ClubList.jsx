import { motion } from "framer-motion";

function ClubList({ filteredClubs, selectedClubId, onSelectedClub }) {
  return (
    <div className="space-y-1">
      {filteredClubs.map((club) => (
        <motion.div
          key={club.id}
          onClick={() => onSelectedClub(club)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-colors ${
            club.id === selectedClubId
              ? "bg-gray-50 border-l-4"
              : "hover:bg-gray-50"
          }`}
          style={club.id === selectedClubId ? { borderLeftColor: club.color } : {}}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ backgroundColor: club.color }}
          >
            {club.title[0]}
          </div>
          <span className={`text-sm ${
            club.id === selectedClubId ? "font-semibold text-gray-900" : "text-gray-700"
          }`}>
            {club.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default ClubList;