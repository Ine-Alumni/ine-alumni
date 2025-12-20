import api from "@/lib/api";

export const offersService = {
  // Get all offers
  getAllOffers: async () => {
    const response = await api.get("/offers");
    return response.data;
  },

  // Get offer details by ID
  getOfferById: async (id) => {
    const response = await api.get(`/offers/${id}`);
    return response.data;
  },

  // Create a new offer
  createOffer: async (offerData) => {
    const response = await api.post("/offers", offerData);
    return response.data;
  },

  // Apply to a job offer
  applyToOffer: async (offerId, applicationData) => {
    const response = await api.post(
      `/offers/${offerId}/apply`,
      applicationData,
    );
    return response.data;
  },
};
