import ClubEvents from "./ClubEvents";

function ClubDetails({ club }) {
  return (
    <div className="flex flex-col flex-1">
      {/* 🔹 Top row: logo + details */}
      <div className="flex mb-4">
        {/* Logo box (square) */}
        <div className="aspect-square w-1/4 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={club.logo}
            alt={club.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Club details box */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl ml-4 p-6">
          <h1 className="text-2xl font-bold">{club.title}</h1>
          <p className="text-gray-600 mt-2">{club.description}</p>
        </div>
      </div>

      {/* 🔹 Bottom row: Events + Board */}
      <div className="flex flex-1 gap-4">
        {/* Events (large & scrollable) */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Événements 📅</h2>
          <p> <ClubEvents club={club} /> </p>
        </div>

        {/* Board members (small rectangle) */}
        <div className="w-1/4 bg-white shadow-lg rounded-2xl p-6">
          <h2 classNam
          e="text-xl font-semibold mb-2">Membres du bureau 👥</h2>
          <div className="space-y-1">
            {club.boardNames.split(",").map((name, index) => (
              <p key={index} className="text-gray-600">
                {name.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;
