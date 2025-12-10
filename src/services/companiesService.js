import api from "./api";

export const companiesService = {
  // Get all companies with pagination and sorting
  getAllCompanies: async (params = {}) => {
    const { page = 0, size = 12, sortBy = "name", sortDir = "asc" } = params;

    const response = await api.get("/companies", {
      params: { page, size, sortBy, sortDir },
    });
    return response.data.response;
  },

  // Search companies
  searchCompanies: async (searchTerm, params = {}) => {
    const { page = 0, size = 12 } = params;
    const response = await api.get("/companies/search", {
      params: { q: searchTerm, page, size },
    });
    return response.data.response;
  },

  // Get company details by ID
  getCompanyById: async (id) => {
    const response = await api.get(`/companies/${id}`);
    return response.data.response;
  },

  // Get company alumni
  getCompanyAlumni: async (id, params = {}) => {
    const { page = 0, size = 12 } = params;
    const response = await api.get(`/companies/${id}/alumni`, {
      params: { page, size },
    });
    return response.data.response;
  },

  // Get company reviews
  getCompanyReviews: async (id, params = {}) => {
    const { page = 0, size = 10 } = params;
    const response = await api.get(`/companies/${id}/reviews`, {
      params: { page, size },
    });
    return response.data.response;
  },
};
