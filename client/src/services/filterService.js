import api from "./api";

export const laureatFilterService = {
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

export const companyFilterService = {
  /**
   * Fetch filter options from backend (if needed)
   * For now, returns static options since industry/location are free-text or predefined
   */
  getFilterOptions: async () => {
    // Optional: fetch dynamic options from backend if needed
    // For simplicity, we return static values matching your DTO
    return {
      industries: [
        "Technologie",
        "Finance",
        "Consulting",
        "Éducation",
        "Santé",
        "Énergie",
        "Télécommunications",
        "Retail",
        "Transport & Logistique",
        "Médias & Divertissement",
        "Industrie manufacturière",
        "Autre"
      ],
      locations: [
        "Casablanca",
        "Rabat",
        "Marrakech",
        "Tanger",
        "Fès",
        "Agadir",
        "Kenitra",
        "Oujda",
        "Meknès",
        "Tétouan",
        "Remote"
      ]
    };
  },

  /**
   * Build filter data for backend API call
   * Converts UI filters to backend-compatible format
   */
  buildFilterData: (filters) => {
    if (Object.keys(filters).length === 0) return null;

    return {
      industry: filters.industry || undefined,
      location: filters.location || undefined,
      minAlumni: filters.minAlumni ? parseInt(filters.minAlumni, 10) : undefined,
      hasEmail: filters.hasEmail !== undefined ? Boolean(filters.hasEmail) : undefined,
      hasNumber: filters.hasNumber !== undefined ? Boolean(filters.hasNumber) : undefined,
    };
  },

  /**
   * Get human-readable label for active filter badges
   */
  getFilterLabel: (key, value) => {
    switch (key) {
      case "industry":
        return `Industrie: ${value}`;
      case "location":
        return `Localisation: ${value}`;
      case "minAlumni":
        return `Min. anciens élèves: ${value}`;
      case "hasEmail":
        return value ? "Avec email RH" : "Sans email RH";
      case "hasNumber":
        return value ? "Avec téléphone RH" : "Sans téléphone RH";
      default:
        return String(value);
    }
  },
};