import { useState } from "react";
import { clubsData } from "./ClubData";
import ClubList from "./ClubList";
import ClubDetails from "./ClubDetails";

function Clubs() {
  const [selectedClub, setSelectedClub] = useState(
    [...clubsData].sort((a, b) => a.title.localeCompare(b.title))[0]
  );

  return (
    <div className="flex min-h-screen bg-gray-50 p-6 gap-2 items-stretch">
      {/* Left Sidebar */}
      <div className="w-1/6">
        <ClubList
          selectedClubId={selectedClub.id}
          onSelectedClub={setSelectedClub}
        />
      </div>

      {/* Right Content */}
      <ClubDetails club={selectedClub} />
    </div>
  );
}

export default Clubs;