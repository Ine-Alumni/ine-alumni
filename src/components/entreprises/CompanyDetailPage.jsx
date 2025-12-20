import { useParams } from "react-router";
import {
  useCompany,
  useCompanyAlumni,
  useCompanyReviews,
} from "@/lib/react-query/hooks/useCompanies";
import { CompanyDetailsHeader } from "@/components/entreprises/CompanyDetailsHeader";
import { HRContactSection } from "@/components/entreprises/HRContactSection";
import { AlumniList } from "@/components/entreprises/AlumniList";
import { ReviewsList } from "@/components/entreprises/ReviewsList";
import { InfoSection } from "@/components/common/InfoSection";

export function CompanyDetailPage() {
  const { id } = useParams();

  // Use React Query hooks for parallel data fetching
  const {
    data: company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompany(id);
  const { data: alumniResponse, isLoading: alumniLoading } = useCompanyAlumni(
    id,
    { page: 0, size: 12 },
  );
  const { data: reviewsResponse, isLoading: reviewsLoading } =
    useCompanyReviews(id, { page: 0, size: 10 });

  // Extract data from responses
  const alumni = alumniResponse?.content || [];
  const reviews = reviewsResponse?.content || [];

  // Combined loading state
  const loading = companyLoading || alumniLoading || reviewsLoading;

  // Error state
  const error = companyError
    ? "Failed to load company information. Please try again."
    : null;

  const handleAlumniClick = (alumni) => {
    console.log("Clicked alumni:", alumni);
    // Navigate to alumni detail page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error || "Company not found"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <CompanyDetailsHeader
          name={company.name}
          logoUrl={company.logo}
          location={company.location || "Maroc"}
          website={company.website || ""}
          domain={company.industry}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <InfoSection
              title="Présentation"
              content={
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {company.description}
                  </p>
                </div>
              }
              className="bg-white p-6 rounded-lg shadow-sm border"
            />

            <AlumniList
              alumni={alumni.map((alumnus) => ({
                id: alumnus.id,
                name: alumnus.fullName,
                photoUrl: alumnus.profilePicture,
                promotion: alumnus.graduationYear?.toString(),
                title: alumnus.currentPosition,
                major: alumnus.major,
                company: company.name,
                location: `${alumnus.city}, ${alumnus.country}`,
                linkedinUrl: alumnus.externalLinks?.find(
                  (link) => link.linkType === "LINKEDIN",
                )?.url,
                email: alumnus.email,
              }))}
              onAlumniClick={handleAlumniClick}
              className="bg-white p-6 rounded-lg shadow-sm border"
            />

            <ReviewsList
              reviews={reviews.map((review) => ({
                id: review.id,
                author: review.alumniName,
                timeAgo: new Date(review.createdAt).toLocaleDateString("fr-FR"),
                rating: review.rating,
                comment: review.comment,
                authorAvatar: review.alumniProfilePicture,
              }))}
              className="bg-white p-6 rounded-lg shadow-sm border"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contacts RH
              </h3>
              <HRContactSection
                contacts={[
                  ...(company.hrContactEmail
                    ? [
                        {
                          title: "Email",
                          description: "Contactez-nous directement",
                          email: company.hrContactEmail,
                        },
                      ]
                    : []),
                  ...(company.externalLinks
                    ?.filter((link) => link.linkType === "LINKEDIN")
                    .map((link) => ({
                      title: "LinkedIn",
                      description: "Suivez-nous sur LinkedIn",
                      linkedin: link.url,
                    })) || []),
                  ...(company.website
                    ? [
                        {
                          title: "Site Web",
                          description: "Visitez notre site",
                          website: company.website,
                        },
                      ]
                    : []),
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
