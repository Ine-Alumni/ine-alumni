import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaGift,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // override avec Tailwind

// Flèches custom
const CustomPrev = () => <span className="text-2xl">‹</span>;
const CustomNext = () => <span className="text-2xl">›</span>;

const EventDetails = () => {
  const { id } = useParams();

  // Fake Event
  const event = {
    id,
    titre: "Caravane Al Ihsane",
    date: new Date(2024, 0, 23), // 23 janvier 2024
    description:
      "Here goes more details about the event, it must be the attractive description...",
    image: "/assets/cas.png",
    lieu: "Atlas, Morocco",
    expectations:
      "Here is the part about expectations from this event, the user here can know what skills he can build...",
  };

  const [value, setValue] = useState(event.date);

  const { titre, description, image, expectations } = event;

  return (
    <div className="bg-white font-sans">
      <div className="mx-[12.5vw] max-lg:mx-[2vw] py-8 flex gap-8">
        {/* Colonne principale */}
        <main className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{titre}</h1>

          {/* Bannière */}
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <img
              src={image || "/default-banner.jpg"}
              alt="Event Banner"
              className="w-full h-72 object-cover"
            />
          </div>

          {/* Expectations + Liens */}
          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            <section className="flex-1 bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-[#5691cb] mb-3 flex items-center gap-2">
                <FaGift className="text-pink-500" /> Expectations
              </h3>
              <p className="text-gray-700 leading-relaxed">{expectations}</p>
            </section>

            <section className="w-full lg:w-80 bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-[#5691cb] mb-3">
                Liens
              </h3>
              <div className="flex gap-4 text-lg text-gray-600">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedinIn className="hover:text-blue-700" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram className="hover:text-pink-500" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF className="hover:text-blue-600" />
                </a>
              </div>
            </section>
          </div>

          {/* Description */}
          <section className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#5691cb] mb-3 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="w-96 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold text-[#5691cb]">
              Organiser par
            </h3>
            <p className="font-semibold text-gray-800 mt-1">CAS INPT</p>
          </div>

          {/* Calendrier */}
          <div className="bg-white rounded-xl shadow p-4 flex justify-center">
            <Calendar
              onChange={setValue}
              value={value}
              prevLabel={<CustomPrev />}
              nextLabel={<CustomNext />}
              prev2Label={null} // ❌ supprime flèches année précédente
              next2Label={null} // ❌ supprime flèches année suivante
              minDetail="month"
              maxDetail="month"
              navigationLabel={({ label }) => <span>{label}</span>}
              // ✅ Override avec Tailwind
              className="
                border-0 rounded-lg text-center
                [&_.react-calendar__navigation]:flex
                [&_.react-calendar__navigation]:justify-between
                [&_.react-calendar__navigation]:items-center
                [&_.react-calendar__navigation]:mb-2
                [&_.react-calendar__navigation__label]:font-medium
                [&_.react-calendar__navigation__label]:bg-transparent
                [&_.react-calendar__navigation__label]:border-0
                [&_.react-calendar__navigation__label]:shadow-none
                [&_.react-calendar__navigation__label:hover]:bg-transparent
                [&_.react-calendar__navigation__arrow]:text-2xl
                [&_.react-calendar__month-view__weekdays]:text-gray-400
                [&_.react-calendar__month-view__weekdays]:text-sm
                [&_.react-calendar__month-view__days__day--neighboringMonth]:text-gray-300
                [&_.react-calendar__tile]:p-2
                [&_.react-calendar__tile]:text-gray-700
                [&_.react-calendar__tile--now]:bg-gray-200
                [&_.react-calendar__tile--active]:bg-black
                [&_.react-calendar__tile--active]:text-white
                [&_.react-calendar__tile--now.react-calendar__tile--active]:bg-black
                [&_.react-calendar__tile]:rounded-lg
                [&_.react-calendar__month-view__days]:grid
                [&_.react-calendar__month-view__days]:grid-cols-7
                [&_.react-calendar__month-view__days]:gap-1
                [&_abbr]:no-underline
              "
            />
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold text-[#5691cb] mb-2">Plan</h3>
            <p className="text-gray-700 text-sm">{event.lieu}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-semibold text-[#5691cb] mb-2">
              Similaires
            </h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Iftar Salim</li>
              <li>• Entrepreneurial Summit</li>
              <li>• Sortie terrain</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;
