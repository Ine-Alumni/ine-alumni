import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import ClubEvents from "./ClubEvents";

function DetailsHeader({ club }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Logo with club color border */}
        <div className="w-32 h-32 flex-shrink-0">
          <div 
            className="w-full h-full rounded-lg p-1"
            style={{ backgroundColor: club.color }}
          >
            <img
              src={club.logo}
              alt={club.title}
              className="w-full h-full object-cover rounded-lg bg-white"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{club.title}</h1>
          <p className="text-gray-600 mb-4">{club.description}</p>
          
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-500">Fondé:</span>
              <span className="ml-2 font-semibold text-gray-800">{club.foundedDate}</span>
            </div>
            <div>
              <span className="text-gray-500">Membres:</span>
              <span className="ml-2 font-semibold text-gray-800">{club.membersCount}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BoardList({ club }) {
  const boardMembers = club.boardNames.split(",").map(name => name.trim());
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5" style={{ color: club.color }} />
        <h2 className="text-xl font-semibold text-gray-900">Bureau</h2>
      </div>
      <div className="space-y-2">
        {boardMembers.map((name, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
              style={{ backgroundColor: club.color }}
            >
              {name[0]}
            </div>
            <span className="text-gray-700 text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClubDetails({ club }) {
  return (
    <div className="flex flex-col flex-1">
      <DetailsHeader club={club} />
      
      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Events Section - Takes 2 columns */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" style={{ color: club.color }} />
            <h2 className="text-xl font-semibold text-gray-900">Événements</h2>
          </div>
          <ClubEvents club={club} />
        </div>

        {/* Board Members Section - Takes 1 column */}
        <BoardList club={club} />
      </div>
    </div>
  );
}

export default ClubDetails;