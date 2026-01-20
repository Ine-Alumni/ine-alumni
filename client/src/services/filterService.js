import api from "./api";

export const filterService = {
  // Get all filter options from backend
  getFilterOptions: async () => {
    const [majors, years, positions, cities, domains, companies] =
      await Promise.all([
        api.get("/laureats/filter-options/majors"),
        api.get("/laureats/filter-options/graduation-years"),
        api.get("/laureats/filter-options/positions"),
        api.get("/laureats/filter-options/cities"),
        api.get("/laureats/filter-options/domains"),
        api.get("/companies", { params: { page: 0, size: 1000 } }),
      ]);

    return {
      majors: majors.data.response,
      graduationYears: years.data.response,
      positions: positions.data.response,
      cities: cities.data.response,
      domains: domains.data.response,
      companies: companies.data.content || [],
    };
  },

  // Build filter data for backend API
  buildFilterData: (filters) => {
    if (Object.keys(filters).length === 0) return null;

    return {
      majors: filters.filiere ? [filters.filiere] : undefined,
      graduationYears: filters.promotion
        ? [parseInt(filters.promotion)]
        : undefined,
      positions: filters.poste ? [filters.poste] : undefined,
      cities: filters.localisation ? [filters.localisation] : undefined,
      domains: filters.domaine ? [filters.domaine] : undefined,
      companyIds: filters.entreprise
        ? [parseInt(filters.entreprise)]
        : undefined,
    };
  },

  // Get filter label for display
  getFilterLabel: (key, value, companies = []) => {
    switch (key) {
      case "promotion":
        return `Promotion: ${value}`;
      case "poste":
        return `Poste: ${value}`;
      case "filiere":
        return `Filière: ${value}`;
      case "entreprise": {
        const company = companies.find((c) => c.id === parseInt(value));
        return `Entreprise: ${company?.name || value}`;
      }
      case "localisation":
        return `Localisation: ${value}`;
      case "domaine":
        return `Domaine: ${value.replace(/_/g, " ")}`;
      default:
        return value;
    }
  },
};
