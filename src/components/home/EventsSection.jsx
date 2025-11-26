import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Users, Share2, Loader2, AlertCircle, Heart } from 'lucide-react';
import authHeader from '../../services/auth-header';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const EventsSection = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/events/public`, {
          method: 'GET',
          headers: 
            authHeader(),
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();

        const processedEvents = data.response.map(event => ({
          ...event,
          image:
            event.image && event.image.startsWith("/uploads")
              ? `${API_BASE_URL}${event.image}`
              : event.image,
        }));

        setEvents(processedEvents);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getRecentEvents = (eventsList) => {
  return eventsList
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  };

  const handleCardClick = (eventId) => {
    navigate(`/evenements/${eventId}`);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-banner.jpg';
    return imagePath;
  };

  const upcomingEvents = getRecentEvents(events);

  const HeaderSection = () => {
  return (
      <div className="flex flex-col items-center gap-[48px] px-6">
        <div className="bg-[#1AA5FF]/10 rounded-[18px] text-center px-6 py-6 w-full mx-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Plateforme de networking pour les étudiants de l'INPT
          </h1>
          <p className="text-base md:text-lg text-gray-700">
           Renforcez vos liens à travers des événements exclusifs — rencontres, partages et inspirations au rendez-vous.
          </p>
        </div>
        </div>
  );
};

  if (loading) {
    return (
      <section className="py-24 px-8">
        <HeaderSection/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#5691cb] mr-3" />
            <span className="text-gray-600">Chargement des événements...</span>
          </div>
        </div>
      </section>
    );
  }


  return (
    <div className="mx-auto text-center pt-25 px-4 py-8">
      <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-[#3A7FC2]">Evénements</h2>
          <div className="mt-2 flex items-center justify-center">
            <span className="block w-16 h-1 bg-[#3A7FC2] rounded" />
          </div>
      </div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Events Grid */}
        <div className="flex flex-wrap gap-13 mb-8 justify-center max-md:gap-8">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              onClick={() => handleCardClick(event.id)}
              role="button"
              tabIndex={0}
              className="bg-white rounded-lg w-90 overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.06)] 
                          hover:shadow-[0_10px_26px_rgba(0,0,0,0.08)]
                         transition-shadow duration-300 cursor-pointer max-w-md"
            >
              <div className="flex-1 relative aspect-video bg-gray-200">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title || 'Événement sans titre'}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/default-banner.jpg'; }}
                />
                <div className="absolute bottom-3 left-3 bg-[#3A7FC2] text-white px-2 py-1 rounded text-sm font-medium">
                  {formatDate(event.date)}
                </div>
              </div>

              <div className="p-4">
                <div className="flex-1 flex-wrap gap-2 mb-2 ">
                  <div className="flex items-center justify-between">
                    <div className='items-start'>
                      <h3 className="font-semibold text-gray-900 text-lg flex-1">
                        {event.title || 'Untitled Event'}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm ml-4">
                      {event.club || 'Organizer'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location || 'INPT, Rabat'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>
                      {new Date(`${event.date}`).toLocaleString("fr-FR", { 
                        weekday: "short", 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {upcomingEvents.length === 0 && (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement à venir</h3>
                <p className="text-gray-500">Revenez bientôt pour découvrir de nouveaux événements !</p>
              </div> 
            )}
        </div>
      </div>
    </div>
    <div className="flex justify-center ">
            <button 
              onClick={() => navigate('/evenements')}
              className="bg-[#3A7FC2] hover:bg-[#2c6aab] cursor-pointer text-white font-medium px-6 py-3 rounded-lg 
              flex items-center gap-2 transition-all duration-200"
            >
              Voir plus
              <ChevronRight className="w-4 h-4" />
            </button>
    </div>
  </div>
</div>
  );
};


export default EventsSection;