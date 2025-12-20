import api from "@/lib/api";

export const eventsService = {
  // Get all public events
  getAllEvents: async () => {
    const response = await api.get("/events/public");
    return response.data;
  },

  // Get event by ID
  getEventById: async (id) => {
    const response = await api.get(`/events/public/${id}`);
    return response.data;
  },

  // Create a new event
  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  // Upload event image
  uploadEventImage: async (formData) => {
    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
