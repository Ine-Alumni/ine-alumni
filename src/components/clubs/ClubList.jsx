/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function ClubList({ filteredClubs, selectedClubId, onSelectedClub }) {
  return (
    <div className="flex flex-col space-y-2">
      {filteredClubs.map((club) => (
        <motion.div
          key={club.id}
          onClick={() => onSelectedClub(club)}
          className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${
            club.id === selectedClubId
              ? "bg-blue-100 font-semibold"
              : "hover:bg-gray-100"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* First letter as mini-icon */}
          <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            {club.title[0]}
          </span>
          <span>{club.title}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default ClubList;
