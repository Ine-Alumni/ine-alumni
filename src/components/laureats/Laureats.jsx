import { useState, useMemo } from "react";
import { ProfileCard } from "@/components/laureats/ProfileCard";
import { SearchBarWithFilters } from "../layout/SearchBarWithFilters";
import { FilterPanel } from "../common/FilterPanel";
import {
  useLaureates,
  useLaureateSearch,
  useLaureateFilters,
} from "@/lib/react-query/hooks/useLaureates";
import { laureateFilters } from "@/data/sampleData.js";

const Laureats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [pagination] = useState({
    pageNumber: 0,
    pageSize: 12,
  });

  // Convert filters to backend format
  const filterData = useMemo(() => {
    if (Object.keys(filters).length === 0) return null;
    return {
      searchTerm: searchQuery,
      majors: filters.filiere ? [filters.filiere] : undefined,
      graduationYears: filters.promotion
        ? [parseInt(filters.promotion)]
        : undefined,
      positions: filters.poste ? [filters.poste] : undefined,
      cities: filters.localisation ? [filters.localisation] : undefined,
      domains: filters.domaine ? [filters.domaine] : undefined,
    };
  }, [filters, searchQuery]);

  // Use React Query hooks - call all hooks unconditionally
  const searchQueryTrimmed = searchQuery.trim();
  const hasFilters = filterData && Object.keys(filters).length > 0;

  const searchHook = useLaureateSearch(searchQueryTrimmed, {
    page: pagination.pageNumber,
    size: pagination.pageSize,
  });
  const filtersHook = useLaureateFilters(filterData, {
    page: pagination.pageNumber,
    size: pagination.pageSize,
  });
  const laureatesHook = useLaureates({
    page: pagination.pageNumber,
    size: pagination.pageSize,
  });

  // Use the appropriate query based on search/filter state
  const laureatesQuery = searchQueryTrimmed
    ? searchHook
    : hasFilters
      ? filtersHook
      : laureatesHook;

  const {
    data: response,
    isLoading: loading,
    error: queryError,
  } = laureatesQuery;

  // Extract data from response
  const laureates = response?.content || [];
  const paginationData = {
    pageNumber: response?.pageNumber ?? 0,
    pageSize: response?.pageSize ?? 12,
    totalElements: response?.totalElements ?? 0,
    totalPages: response?.totalPages ?? 0,
  };

  // Convert query error to string for display
  const error = queryError
    ? "Failed to load laureates. Please try again."
    : null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Annuaires des Lauréats
          </h1>
          <p className="text-gray-600">
            Trouvez et connectez-vous avec les anciens de l'INPT
          </p>
        </div>

        <div className="mb-8">
          <SearchBarWithFilters
            placeholder="Recherche par nom, entreprise ou filière..."
            onSearch={setSearchQuery}
            filters={
              <FilterPanel filters={laureateFilters} onChange={setFilters} />
            }
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {paginationData.totalElements} lauréats trouvés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {laureates.map((laureate) => (
                <ProfileCard
                  key={laureate.id}
                  profileData={{
                    id: laureate.id,
                    name: laureate.fullName,
                    photoUrl: laureate.profilePicture,
                    promotion: laureate.graduationYear?.toString(),
                    title: laureate.currentPosition,
                    major: laureate.major,
                    company: laureate.currentCompany?.name,
                    location: `${laureate.city}, ${laureate.country}`,
                    linkedinUrl: laureate.externalLinks?.find(
                      (link) => link.linkType === "LINKEDIN",
                    )?.url,
                    email: laureate.email,
                  }}
                />
              ))}
            </div>

            {laureates.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun lauréat trouvé.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Laureats;
