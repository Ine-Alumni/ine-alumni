import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaGift, FaCamera, FaStar,
  FaFacebookF, FaInstagram, FaLinkedinIn, FaHeart
} from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scriptId = 'cally-calendar-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/cally';
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/evenements/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch event data');
        return res.json();
      })
      .then((data) => {
        // Construire URL complète de l'image si nécessaire
        if (data.image && data.image.startsWith('/uploads/')) {
          data.image = `http://localhost:8080${data.image}`;
        }
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

const { titre, date, description, image, localisation, schedule, expectations } = event;

  return (
    <>
      <style>{`/* style calendar */`}</style>

      <div className="flex h-screen font-sans bg-gray-100">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Banner */}
          <div className="relative">
            <img
              src={image || "/default-banner.jpg"}
              alt="Event Banner"
              className="w-full h-64 object-cover rounded-xl"
            />
            <span className="absolute top-4 right-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              {new Date(date) < new Date() ? 'Past' : 'Upcoming'}
            </span>
          </div>

          {/* Titre + infos */}
          <section className="mt-6 flex justify-between items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <h2 className="text-3xl font-bold text-gray-800">{titre}</h2>
              <p className="text-gray-600 mt-1">
                📅 {new Date(date).toLocaleString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="flex items-center gap-2 text-gray-600 mt-1">
                <FaMapMarkerAlt className="text-red-600" />
                {localisation || "INPT, Rabat"}
                <a
                  href={`https://maps.google.com?q=${encodeURIComponent(localisation || "INPT Rabat")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-sm text-blue-500 underline hover:text-blue-600"
                >
                  View Map
                </a>
              </p>
            </div>

            {/* Réseaux + Like */}
            <div className="flex items-center gap-4 text-gray-600 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <button
                onClick={() => setLiked(!liked)}
                aria-label="Like event"
                className={`flex items-center gap-1 text-2xl transition-colors duration-300 ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              >
                <FaHeart />
              </button>
            </div>
          </section>

          {/* Description */}
          <section className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-2 text-[#5691cb]">About the Event</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </section>

          {/* Schedule */}
          {schedule && (
  <section className="mt-6 bg-white rounded-xl shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4 text-[#5691cb]">Event Schedule</h3>
    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
      {schedule}
    </div>
  </section>
)}

        </main>

        {/* Sidebar */}
        <aside className="w-96 bg-white shadow-md p-6 flex flex-col">
          {/* Calendar */}
          <section>
            <h3 className="text-xl font-semibold text-[#5691cb] mb-4">Event Calendar</h3>
            <calendar-date className="bg-white p-4 rounded-2xl shadow-xl border border-gray-200 w-full relative">
              <div slot="previous" className="absolute left-2 top-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gray-700 hover:text-purple-700"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              </div>
              <div slot="next" className="absolute right-2 top-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gray-700 hover:text-purple-700"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </div>
              <calendar-month></calendar-month>
            </calendar-date>
          </section>

          {/* What to Expect */}
{expectations && (
  <section className="mt-6">
    <h3 className="text-xl font-semibold text-[#5691cb] mb-4">What to Expect</h3>
    <ul className="space-y-3 text-gray-700">
      {expectations.split('\n').map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          {item.includes('Cert') && <FaGift className="text-pink-500" />}
          {item.toLowerCase().includes('photo') && <FaCamera className="text-purple-500" />}
          {item.toLowerCase().includes('recognition') && <FaStar className="text-yellow-500" />}
          {item.toLowerCase().includes('networking') && <FaHeart className="text-red-400" />}
          {item}
        </li>
      ))}
    </ul>
  </section>
)}


          {/* Join button */}
          <div className="mt-auto pt-6">
            <button
              onClick={() => window.open('https://forms.gle/your-form-link', '_blank')}
              className="bg-[#5691cb] text-white py-2 px-4 rounded-full w-full hover:bg-[#3b7cb7]"
            >
              Join the Session
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default EventDetails;
