import { useEffect, useState } from "react";
import { Calendar, MapPin, Loader2, AlertCircle } from "lucide-react";
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
        setError("Échec du chargement des événements");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [club.title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" style={{ color: club.color }} />
        <span>Chargement...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500 py-4 bg-red-50 p-4 rounded-lg">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" style={{ color: club.color }} />
        <p>Aucun événement prévu</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-50 p-4 rounded-lg border-l-4 hover:shadow-md transition-all cursor-pointer"
          style={{ borderLeftColor: club.color }}
        >
          <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: club.color }} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: club.color }} />
            <span>
              {new Date(event.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClubEvents;