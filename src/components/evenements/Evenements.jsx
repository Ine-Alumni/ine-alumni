import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Flag, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Composant EventCard (utilisé pour Today et Prochaine)
const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Fonction pour ouvrir Google Calendar avec l'événement
  const addToCalendar = (e) => {
    e.stopPropagation(); // évite que ça déclenche aussi autre chose
    const startDate =
      eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate =
      new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      "Organisé par " + event.organizer
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden min-w-[320px] transition duration-300"
      style={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={event.image || "/assets/cas.png"}
          alt={event.title}
          className="h-40 w-full object-cover"
        />

        {/* Date en bas à gauche */}
        <span className="absolute bottom-2 left-2 bg-[#5691cb] text-white text-xs px-3 py-1 rounded-full">
          {formattedDate}
        </span>

        {/* Icône calendrier en bas à droite */}
        <button
          onClick={addToCalendar}
          className="absolute bottom-2 right-2 bg-white text-[#5691cb] p-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          <CalendarDays size={18} />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">
          {event.title}{" "}
          <span className="text-gray-400 font-normal">{event.organizer}</span>
        </h3>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-[#5691cb]" />
            <span>{event.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-red-500" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Bouton Voir plus */}
        <button
          onClick={() => navigate(`/eventdetails/${event.id}`)}
          className="mt-4 w-full bg-[#5691cb] text-white py-2 px-4 rounded-lg hover:bg-[#4578a8] transition"
        >
          Voir plus
        </button>
      </div>
    </div>
  );
};

// Composant principal
const Evenements = () => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Données exemple avec ID
  const todayEvents = [
    {
      id: 1,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Azilal",
      date: "2026-02-13",
      image: "/assets/cas.png",
    },
  ];

  const nextEvents = [
    {
      id: 2,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Externe",
      date: "2025-09-20",
      image: "/assets/cas.png",
    },
    {
      id: 3,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Interne",
      date: "2025-09-25",
      image: "/assets/cas.png",
    },
    {
      id: 4,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Externe",
      date: "2025-10-05",
      image: "/assets/cas.png",
    },
    {
      id: 5,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Externe",
      date: "2025-10-05",
      image: "/assets/cas.png",
    },
    {
      id: 6,
      title: "Caravane Al Ihsane",
      organizer: "Cas INPT",
      type: "Social",
      location: "Externe",
      date: "2025-10-05",
      image: "/assets/cas.png",
    },
  ];

  const allEvents = [
    {
      id: 5,
      title: "Integration Bee",
      organizer: "MSC",
      type: "Comité",
      location: "Interne",
      date: "2025-09-22",
    },
    {
      id: 6,
      title: "Networking Night",
      organizer: "Cas INPT",
      type: "Social",
      location: "Externe",
      date: "2025-09-28",
    },
    {
      id: 7,
      title: "Hackathon INPT",
      organizer: "INPT",
      type: "Entrepreneurship",
      location: "Interne",
      date: "2025-10-01",
    },
    {
      id: 8,
      title: "Integration Bee",
      organizer: "MSC",
      type: "Comité",
      location: "Externe",
      date: "2025-10-05",
    },
  ];

  return (
    <div className="mx-[12.5vw] max-lg:mx-[2vw] py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Les evenements</h1>
          <p className="text-gray-500 mt-2">IneAlumni ...</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-[#5691cb] text-white rounded-full shadow hover:bg-[#4578a8]">
          +
        </button>
      </div>

      {/* Today */}
      <section className="mb-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Today</h2>
        <div className="flex gap-6 overflow-x-auto">
          {todayEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prochaine */}
      <section className="mb-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Prochaine</h2>
        <div className="flex gap-6 overflow-x-auto">
          {nextEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tous */}
      <section className="relative bg-white rounded-xl shadow-md p-6 mt-12">
        <h2 className="text-xl font-semibold mb-6">Tous</h2>

        {/* Bouton filtre */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute -top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full bg-white shadow hover:bg-gray-100"
        >
          {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-lg shadow-inner p-6 mb-6 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Social</option>
                  <option>Entrepreneurship</option>
                  <option>Design</option>
                  <option>Comité</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Localisation</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Interne</option>
                  <option>Externe</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Annuler
              </button>
              <button className="px-4 py-2 bg-[#5691cb] text-white rounded-md hover:bg-[#4578a8]">
                Chercher
              </button>
            </div>
          </motion.div>
        )}

        {/* Liste Tous */}
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allEvents.map((event, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(`/evenements/${event.id}`)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="cursor-pointer flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-[#5691cb] text-white rounded-md">
                  <CalendarDays size={22} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {event.organizer} › {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Evenements;
