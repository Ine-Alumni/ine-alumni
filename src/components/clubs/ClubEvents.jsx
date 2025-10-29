import { useEffect, useState } from "react";
import authHeader from "../../services/auth-header";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

function ClubEvents({ club }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/events/public`, {
          headers: authHeader(),
        });
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();

        // Filter events by club
        const filtered = data.response.filter(
          (e) => e.nameOfClub === club.title,
        );

        setEvents(filtered);
      } catch (err) {
        setError("Failed to load events");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [club.title]); // refetch when club changes

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;
  if (events.length === 0) return <p>No events for this club.</p>;

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-50 p-4 rounded shadow hover:shadow-md transition"
        >
          <h3 className="font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.location}</p>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString("fr-FR")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ClubEvents;
