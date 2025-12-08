import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Plus, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";

const Evenements = () => {
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
  const FILE_BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
    "http://localhost:8080";

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState("Toutes");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    description: "",
    schedule: "",
    image: "",
    whatToExpect: "",
  });

  const [events, setEvents] = useState([]);

  const calendarRef = useRef(null);
  const modalRef = useRef(null);

  const handleDateChange = () => {
    const calendarEl = calendarRef.current;
    if (!calendarEl) return;

    const rawDate = calendarEl.value;
    if (!rawDate) {
      console.warn("No date selected");
      return;
    }

    const selectedDate = new Date(rawDate).toISOString().slice(0, 10);
    console.log("✅ Date selected from DOM:", selectedDate);

    setSelectedCalendarDate(selectedDate);
    setShowCalendar(false);
  };

  useEffect(() => {
    const scriptId = "cally-calendar-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/cally";
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddEventModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showCalendar) return;

    const calendarEl = calendarRef.current;
    if (!calendarEl) return;

    calendarEl.addEventListener("change", handleDateChange);

    return () => {
      calendarEl.removeEventListener("change", handleDateChange);
    };
  }, [showCalendar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${API_BASE_URL}/files/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const data = await res.json();
        const imageUrl = data.response;

        setNewEvent((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error(error);
        alert("Erreur lors du téléchargement de l'image");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventToSend = {
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      location: newEvent.location,
      club: newEvent.category,
      image: newEvent.image,
      schedule: newEvent.schedule,
      expectations: newEvent.whatToExpect,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventToSend),
      });

      if (!response.ok) {
        throw new Error("Error saving event");
      }

      let savedEvent = await response.json();
      savedEvent = savedEvent.response;

      setEvents((prev) => [
        ...prev,
        {
          id: savedEvent.id,
          title: savedEvent.titre,
          category: savedEvent.club,
          date: savedEvent.date,
          location: savedEvent.lieu,
          description: savedEvent.description,
          status: new Date(savedEvent.date) < new Date() ? "Passé" : "À venir",
          progress: 0,
          price: 0,
          image: `${FILE_BASE_URL}${newEvent.image}`,
          schedule: newEvent.schedule,
          whatToExpect: newEvent.whatToExpect,
        },
      ]);

      setNewEvent({
        title: "",
        category: "",
        date: "",
        location: "",
        description: "",
        schedule: "",
        image: "",
        whatToExpect: "",
      });

      setShowAddEventModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout de l'événement");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events/public`, { 
          method: "GET"
        });
        if (!response.ok) {
          throw new Error("Error loading events");
        }
        const data = await response.json();

        const adaptedEvents = (data.response || []).map((evt) => ({
          id: evt.id,
          title: evt.title,
          category: evt.club,
          date: evt.date,
          location: evt.location,
          description: evt.description,
          status: new Date(evt.date) < new Date() ? "Passé" : "À venir",
          progress: 0,
          price: 0,
          image: evt.image
            ? `${FILE_BASE_URL}${evt.image.startsWith("/") ? evt.image : "/" + evt.image}`
            : "",
          schedule: "",
          whatToExpect: evt.expectations || "",
        }));

        setEvents(adaptedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const isSoon = (dateStr) => {
    const eventDate = new Date(dateStr);
    const now = new Date();
    const diff = (eventDate - now) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff < 3;
  };

  const filters = ["Tous", "Passé", "À venir"];
  const filterMap = {
    "Tous": "All",
    "Passé": "Past",
    "À venir": "Upcoming"
  };
  
  const isDateInRange = (eventDate, range) => {
    const now = new Date();
    const date = new Date(eventDate);

    if (range === "Cette semaine") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return date >= startOfWeek && date <= endOfWeek;
    }

    if (range === "Ce mois") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    if (range === "Cette année") {
      return date.getFullYear() === now.getFullYear();
    }

    return true;
  };

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      selectedFilter === "Tous" || event.status === selectedFilter;

    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(lowerSearch) ||
      event.category.toLowerCase().includes(lowerSearch) ||
      event.location.toLowerCase().includes(lowerSearch) ||
      event.description.toLowerCase().includes(lowerSearch);

    const matchesDateRange = isDateInRange(event.date, selectedDateRange);

    const matchesCalendarDate = selectedCalendarDate
      ? new Date(event.date).toISOString().slice(0, 10) === selectedCalendarDate
      : true;

    return (
      matchesFilter && matchesSearch && matchesDateRange && matchesCalendarDate
    );
  });

  return (
    <div className="p-6 font-sans bg-white">
      <div className="bg-[#fafafa] rounded-xl py-10 px-4 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Nos Événements
        </h1>
        <p className="mt-3 text-gray-600 text-lg max-w-md mx-auto">
          Tous les moments forts de notre communauté.
        </p>
      </div>

      <div className="bg-[#fafafa] px-4 py-8 rounded-xl">
        <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-between mb-8">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  selectedFilter === filter
                    ? "bg-[#5691cb] text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-[#e0ecf7]"
                }`}
              >
                {filter} (
                {
                  events.filter((e) => filter === "Tous" || e.status === filter)
                    .length
                }
                )
              </button>
            ))}
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2 items-center flex-1 justify-end relative">
            <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un événement"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative flex items-center gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="Toutes">Toutes les dates</option>
                <option value="Cette semaine">Cette semaine</option>
                <option value="Ce mois">Ce mois</option>
                <option value="Cette année">Cette année</option>
              </select>

              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
              >
                <Calendar className="w-5 h-5 text-[#5691cb]" />
              </button>

              <div className="relative group">
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="p-2 rounded-md bg-white text-[#5691cb] hover:bg-gray-100 transition-all border border-gray-300"
                >
                  <Plus className="w-5 h-5 text-[#5691cb]" />
                </button>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  Ajouter un événement
                </div>
              </div>

              {showCalendar && (
                <div className="absolute top-12 right-0 z-50">
                  <calendar-date
                    ref={calendarRef}
                    className="bg-white p-4 rounded-2xl shadow-xl border border-gray-200 w-72"
                  >
                    <div
                      slot="previous"
                      className="absolute left-2 top-3 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-[#5691cb]" />
                    </div>
                    <div
                      slot="next"
                      className="absolute right-2 top-3 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700 hover:text-[#5691cb]" />
                    </div>
                    <calendar-month></calendar-month>
                  </calendar-date>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedCalendarDate && (
          <div className="text-sm text-gray-600 mb-4">
            Événements pour la date : <strong>{selectedCalendarDate}</strong>
            <button
              className="ml-2 text-red-500 hover:underline"
              onClick={() => setSelectedCalendarDate(null)}
            >
              Réinitialiser
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate(`/evenements/${event.id}`)}
              className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gray-100 text-[#5691cb] text-xs font-medium px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="bg-[#5691cb] text-white text-xs font-medium px-3 py-1 rounded-full">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {event.title}
                  {isSoon(event.date) && (
                    <span className="text-xs text-orange-500 font-semibold">
                      Bientôt
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#5691cb]" />
                  {new Date(event.date).toLocaleString("fr-FR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-orange-500" /> {event.location}
                </p>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-[#5691cb] h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title
                    )}&dates=${event.date
                      .replace(/[-:]/g, "")
                      .replace("T", "")}/${event.date
                      .replace(/[-:]/g, "")
                      .replace("T", "")}&location=${encodeURIComponent(
                      event.location
                    )}&sf=true&output=xml`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-[#5691cb] hover:underline flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    Ajouter à Google Agenda
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-2xl border border-gray-200 transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ajouter un nouvel événement</h2>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                  placeholder="Nom de l'événement"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Catégorie</label>
                <select
                  name="category"
                  value={newEvent.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="Entrepreneurship">Entrepreneuriat</option>
                  <option value="Social">Social</option>
                  <option value="Design">Design</option>
                  <option value="Comite">Comité</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Date et heure
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                    placeholder="Lieu de l'événement"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                  placeholder="Détails de l'événement"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Programme
                </label>
                <textarea
                  name="schedule"
                  value={newEvent.schedule}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                  placeholder="Décrivez le programme de l'événement"
                  rows="2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Image de l'événement
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                />
              </div>

              {newEvent.image && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Aperçu de l'image
                  </label>
                  <img
                    src={`${FILE_BASE_URL}${newEvent.image}`}
                    alt="Preview"
                    className="w-full max-h-64 object-contain border border-gray-300 rounded-md"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  À quoi s'attendre ?
                </label>
                <textarea
                  name="whatToExpect"
                  value={newEvent.whatToExpect}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5691cb] focus:border-transparent"
                  placeholder="Par exemple : Conférences, ateliers, réseautage..."
                  rows="2"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5691cb] text-white rounded-md hover:bg-[#4578a8] transition-colors"
                >
                  Ajouter l'événement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evenements;