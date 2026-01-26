import { useState, useEffect, useCallback, useRef } from "react";
import { ProfileCard } from "@/components/laureats/ProfileCard";
import { SearchBarWithFilters } from "../layout/SearchBarWithFilters";
import { FilterPanel } from "../common/FilterPanel";
import { laureatsService } from "@/services/laureatsService";
import { laureatFilterService } from "@/services/filterService";

const Laureats = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [laureates, setLaureates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 12,
    totalElements: 0,
    totalPages: 0,
  });
  const sentinelRef = useRef(null);

  const fetchLaureates = useCallback(
    async (page, append = false) => {
      try {
        append ? setLoadingMore(true) : setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 500));

        const filterData = laureatFilterService.buildFilterData(appliedFilters);
        const params = { page, size: 12 };
        if (sortBy) {
          params.sortBy = sortBy;
          params.sortDir = "asc";
        }

        const response = searchQuery.trim()
          ? await laureatsService.searchLaureates(searchQuery, params)
          : filterData
            ? await laureatsService.filterLaureates(filterData, params)
            : await laureatsService.getAllLaureates(params);

        setLaureates((prev) =>
          append ? [...prev, ...response.content] : response.content,
        );
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
        });
      } catch (err) {
        console.error("Error fetching laureates:", err);
        setError("Failed to load laureates. Please try again.");
        if (!append) setLaureates([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchQuery, appliedFilters, sortBy],
  );

  // Fetch initial data and reset on search/filter change
  useEffect(() => {
    fetchLaureates(0, false);
  }, [fetchLaureates]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          !loadingMore &&
          pagination.pageNumber < pagination.totalPages - 1
        ) {
          fetchLaureates(pagination.pageNumber + 1, true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    loading,
    loadingMore,
    pagination.pageNumber,
    pagination.totalPages,
    fetchLaureates,
  ]);

  const handleSortChange = (sortValue) => {
    const mapping = { name: "fullName", promotion: "graduationYear" };
    setSortBy(mapping[sortValue] || "");
  };

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
            onSortChange={handleSortChange}
            filters={
              <FilterPanel
                filterService={laureatFilterService}
                onFilterChange={() => {}}
                onApplyFilters={setAppliedFilters}
              />
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
                {pagination.totalElements} lauréats trouvés
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
                      (link) => link.linkType === "LINKEDIN"
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

            {/* Infinite scroll sentinel */}
            {laureates.length > 0 &&
              pagination.pageNumber < pagination.totalPages - 1 && (
                <div ref={sentinelRef} className="py-8 flex justify-center">
                  {loadingMore && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  )}
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Laureats;
