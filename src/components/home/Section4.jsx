import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Users, Share2, Loader2, AlertCircle, Heart } from 'lucide-react';
import authHeader from '../../services/auth-header';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const Section4 = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
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

        // Fix image URLs
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

  // Get top 3 upcoming events
  const getUpcomingEvents = (eventsList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return eventsList
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
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

  const upcomingEvents = getUpcomingEvents(events);

  const HeaderSection = () => {
  return (
      <div className="flex flex-col items-center gap-[48px] px-6">
        <div className="bg-[#1AA5FF]/10 rounded-[18px] text-center px-6 py-6 w-full mx-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Plateforme de networking pour les étudiants de l'INPT
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            Un pont entre les promotions — partagez vos expériences, trouvez des mentors et progressez ensemble.
          </p>
        </div>
          <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-[#3A7FC2]">Evénements</h2>
          <div className="mt-2 flex items-center justify-center">
            <span className="block w-16 h-1 bg-[#3A7FC2] rounded" />
          </div>
          <p className="text-sm text-gray-700 mt-3 max-w-xl mx-auto">Trouver les evenements prochains</p>
        </div>
        </div>
  );
};

  // Loading state
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

  // Error state
  if (error) {
    return (
      <section className="py-12">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <HeaderSection/>
          <div className="text-center ">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur lors du chargement des événements</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white font-medium rounded-lg transition-colors duration-200"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }


  // Render events section
  return (
    <div className="mx-auto text-center pt-25 px-4">
  <HeaderSection/>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Events Grid */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              onClick={() => handleCardClick(event.id)}
              role="button"
              tabIndex={0}
              className="bg-white rounded-lg w-100 overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer max-w-md"
            >
              {/* Image Container - keep 16:9 aspect for provided images */}
              <div className="relative aspect-video bg-gray-200">
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

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900 text-lg flex-1">
                    {event.title || 'Événement sans titre'}
                  </h3>
                  <p className="text-gray-500 text-sm whitespace-nowrap ml-3">
                    {event.nameOfClub || 'Organisateur'}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location || 'INPT, Rabat'}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.category ? event.category : 'Général'}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>
                      {new Date(event.date).toLocaleString("fr-FR", {
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
        </div>

        {/* Discover More Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigate('/evenements')}
            className="bg-[#3A7FC2] hover:bg-[#2c6aab] cursor-pointer text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200"
          >
            Voir plus
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    {/* No Events Message */}
    {upcomingEvents.length === 0 && (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement à venir</h3>
        <p className="text-gray-500">Revenez bientôt pour découvrir de nouveaux événements !</p>
      </div>
    )}
  </div>
</div>
  );
};


export default Section4;
