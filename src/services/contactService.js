import api from "@/lib/api";

export const contactService = {
  // Submit contact form
  submitContactForm: async (formData) => {
    const response = await api.post("/contact", formData);
    return response.data;
  },
};
