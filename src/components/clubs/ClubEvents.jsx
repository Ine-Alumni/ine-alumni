import { useEffect, useState } from 'react';
import authHeader from '../../services/auth-header';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

function ClubEvents({ club }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          headers: authHeader(),
        });
        const data = await response.json();

        // ✅ Filter events that belong to this club
        const filtered = data.filter(
          (event) => event.nameOfClub === club.title
        );

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [club.title]); // refetch when club changes

  // 🧩 Loading or empty states
  if (loading)
    return <p className="text-gray-500 italic">Chargement des événements...</p>;
  if (events.length === 0)
    return (
      <p className="text-gray-500 italic">
        Aucun événement trouvé pour ce club.
      </p>
    );

  // 🧱 Events list
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-50 rounded-xl shadow p-4 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{event.location}</p>
          <p className="text-sm text-gray-500">{event.startDate}</p>
        </div>
      ))}
    </div>
  );
}

export default ClubEvents;