import { clubsData } from "./ClubData";

const sortedClubs = [...clubsData].sort((a, b) =>
    a.title.localeCompare(b.title)
);
function ClubList({selectedClubId, onSelectedClub}) {
    return (
        <div className="w-full h-full bg-white shadow-lg rounded-2xl p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Les Clubs</h2>
            {sortedClubs.map((club) => (
                <div
                    key={club.id}
                    onClick={() => onSelectedClub(club)}
                    className={`cursor-pointer p-2 mb-2 rounded-xl mb-2 hover:bg-gray-100 ${selectedClubId === club.id ? "bg-gray-200 font-semibold" : ""}`}
                >
                    {club.title}
                </div>
            ))}
        </div>
    );
}

export default ClubList;