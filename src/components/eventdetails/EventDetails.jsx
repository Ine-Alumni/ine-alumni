import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Gift, Camera, Star, Heart, Facebook, Instagram, Linkedin } from "lucide-react";
import authHeader from "../../services/auth-header";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const calendarRef = useRef(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
  const FILE_BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
    "http://localhost:8080";

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
    fetch(`${API_BASE_URL}/events/public/${id}`, {
      method: "GET",
      headers: authHeader(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec du chargement des données de l'événement");
        return res.json();
      })
      .then((data) => {
        if (data.response?.image && data.response.image.startsWith("/uploads/")) {
          data.response.image = `${FILE_BASE_URL}${data.response.image}`;
        }
        setEvent(data.response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const applyCallyStyles = () => {
      if (!calendarRef.current) return;
      const shadowRoot = calendarRef.current.shadowRoot;
      if (!shadowRoot) return;

      let styleTag = shadowRoot.getElementById("custom-cally-styles");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "custom-cally-styles";
        shadowRoot.appendChild(styleTag);
      }

      styleTag.textContent = `
        [part="selected-day"] {
          position: relative;
          background-color: transparent !important;
          color: #5691cb !important;
          font-weight: bold !important;
          z-index: 1;
        }
        [part="selected-day"]::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(3deg);
          width: 36px;
          height: 36px;
          border: 2px dashed #5691cb;
          border-radius: 50%;
          z-index: -1;
          animation: handDrawn 0.5s ease-in-out;
        }
        @keyframes handDrawn {
          0% {
            transform: translate(-50%, -50%) scale(0.8) rotate(5deg);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(3deg);
            opacity: 1;
          }
        }
      `;
    };

    applyCallyStyles();
    const observer = new MutationObserver(applyCallyStyles);
    if (calendarRef.current && calendarRef.current.shadowRoot) {
      observer.observe(calendarRef.current.shadowRoot, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [event]);

  useEffect(() => {
    if (event && event.date && calendarRef.current) {
      const calendarElement = calendarRef.current;
      const isoDate = new Date(event.date).toISOString().slice(0, 10);
      if (calendarElement.value !== isoDate) {
        calendarElement.value = isoDate;
        calendarElement.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  }, [event]);

  if (loading) return <div className="p-6 text-center">Chargement de l'événement...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const { titre, date, description, image, location, schedule, expectations } = event;

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        
        <div className="relative">
          <img
            src={image || "/default-banner.jpg"}
            alt="Bannière de l'événement"
            className="w-full h-64 object-cover rounded-xl"
          />
          <span className="absolute top-4 right-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
            {new Date(date) < new Date() ? "Passé" : "À venir"}
          </span>
        </div>

        <section className="mt-6 flex justify-between items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl font-bold text-gray-800">{titre}</h2>
            <p className="text-gray-600 mt-1">
              📅{" "}
              {new Date(date).toLocaleString("fr-FR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <a
              href={`https://maps.google.com?q=${encodeURIComponent(
                location || ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 mt-1 hover:text-blue-600 transition-colors w-fit"
            >
              <MapPin className="w-5 h-5 text-red-600" />
              <span className="underline">{location}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-gray-600 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <button
              onClick={() => setLiked(!liked)}
              aria-label="Aimer l'événement"
              className={`flex items-center gap-1 transition-colors duration-300 ${
                liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className="w-6 h-6" fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </section>

        <section className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold mb-2 text-[#5691cb]">
            À propos de l'événement
          </h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </section>

        {expectations && (
          <section className="mt-6 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#5691cb]">
              À quoi s'attendre
            </h3>
            <ul className="space-y-3 text-gray-700">
              {expectations.split("\n").map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.includes("Cert") && <Gift className="text-pink-500" />}
                  {item.toLowerCase().includes("photo") && (
                    <Camera className="text-purple-500" />
                  )}
                  {item.toLowerCase().includes("reconnaissance") && (
                    <Star className="text-yellow-500" />
                  )}
                  {item.toLowerCase().includes("networking") && (
                    <Heart className="text-red-400" />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <aside className="w-96 bg-transparent p-4 flex flex-col gap-4">

        {/* Bloc: Calendrier */}
        <div className="bg-white shadow-sm rounded-xl p-4">
          <calendar-date
            ref={calendarRef}
            className="bg-white p-4 rounded-xl border border-gray-200 w-full relative"
          >
            <div slot="previous" className="absolute left-2 top-3 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   className="w-5 h-5 text-gray-700 hover:text-[#5691cb]">
                <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div slot="next" className="absolute right-2 top-3 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   className="w-5 h-5 text-gray-700 hover:text-[#5691cb]">
                <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <calendar-month></calendar-month>
          </calendar-date>
        </div>

        {/* Bloc: Programme */}
        {schedule && (
          <div className="bg-white shadow-sm rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Programme</h3>
            <div className="text-gray-700 text-sm whitespace-pre-line">
              {schedule}
            </div>
          </div>
        )}

        {/* Bloc: Événements similaires */}
        <div className="bg-white shadow-sm rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Événements similaires</h3>
          <ul className="list-disc list-inside text-[#5691cb] space-y-1 text-sm">
            <li>Iftar Salim</li>
            <li>Sommet de l'Entrepreneuriat</li>
            <li>Sortie terrain</li>
          </ul>
        </div>
      </aside>

    </div>
  );
};

export default EventDetails;