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

        const response = await fetch(`${API_BASE_URL}/events`, {
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
    navigate(`/events/${eventId}`);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/default-banner.jpg';
    return imagePath;
  };

  const upcomingEvents = getUpcomingEvents(events);

  const HeaderSection = () => {
  return (
      <div className="flex flex-col items-center gap-[80px] px=6">
        <div className="bg-[#1AA5FF]/10 rounded-[18px] text-center px-8 py-6 w-full mx-9">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Plateforme de n etworking pour les étudiants de INPT
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            A bridge between past and present students — share experiences, find
            mentors, and grow together.
          </p>
        </div>
          <h2 className=" font-bold text-gray-800 text-[30px] mb-12">
            Events
            <div className="w-[110px] h-0.5 bg-black mx-auto mt-3"></div>
          </h2>
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
            <span className="text-gray-600">Loading events...</span>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Events</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white font-medium py-2 px-15 rounded-lg transition-colors duration-200"
            >
              Try Again
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
        <div className="flex justify-center gap-14 mb-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              onClick={() => handleCardClick(event.id)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer w-100"
            >

              {/* Image Container */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={getImageUrl(event.image)}
                  alt={event.title || 'Event'}
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.src = '/default-banner.jpg'; 
                  }}
                />
                
                {/* Date Badge */}
                <div className="absolute bottom-3 left-3 bg-[#3A7FC2] text-white px-2 py-1 rounded text-sm font-medium">
                  {formatDate(event.date)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title, Club, Location & Category on the same row */}
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg flex-1">
                      {event.title || 'Untitled Event'}
                    </h3>
                    <p className="text-gray-500 text-sm ml-4">
                      {event.nameOfClub || 'Organizer'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location || 'INPT, Rabat'}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.category || 'General'}
                    </div>
                  </div>
                </div>

                {/* Date at bottom with separator */}
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

            </div>
          ))}
        </div>

        {/* Discover More Button */}
        <div className="flex justify-center mt-15">
          <button 
            onClick={() => navigate('/evenements')}
            className="bg-[#3A7FC2] hover:bg-[#2c6aab] cursor-pointer text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Discover more
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    {/* No Events Message */}
    {upcomingEvents.length === 0 && (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
        <p className="text-gray-500">Check back soon for new events!</p>
      </div>
    )}
  </div>
</div>
  );
};

export default Section4;
