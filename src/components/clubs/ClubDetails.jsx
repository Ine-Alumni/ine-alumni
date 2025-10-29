/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ClubEvents from "./ClubEvents";

function DetailsHeader({ club }) {
  return (
    <motion.div
      className="flex mb-4 flex-col md:flex-row"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square w-full md:w-1/4 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={club.logo}
          alt={club.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 bg-white shadow-lg rounded-2xl md:ml-4 mt-4 md:mt-0 p-6">
        <h1 className="text-2xl font-bold">{club.title}</h1>
        <p className="text-gray-600 mt-2">{club.description}</p>
        <p className="text-gray-500 mt-1">Founded: {club.foundedDate}</p>
        <p className="text-gray-500 mt-1">Members: {club.membersCount}</p>
      </div>
    </motion.div>
  );
}

function BoardList({ boardNames }) {
  return (
    <div className="w-1/4 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Membres du bureau 👥</h2>
      <div className="space-y-1">
        {boardNames.split(",").map((name, idx) => (
          <p key={idx} className="text-gray-600">
            {name.trim()}
          </p>
        ))}
      </div>
    </div>
  );
}

function ClubDetails({ club }) {
  return (
    <div className="flex flex-col flex-1">
      <DetailsHeader club={club} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Événements 📅</h2>
          <ClubEvents club={club} />
        </div>
        <BoardList boardNames={club.boardNames} />
      </div>
    </div>
  );
}

export default ClubDetails;
