import { useParams } from "react-router";
import { LaureateDetailsHeader } from "@/components/laureats/LaureateDetailsHeader";
import { Timeline } from "@/components/common/Timeline";
import { SkillsList } from "@/components/laureats/SkillsList";
import { InfoSection } from "@/components/common/InfoSection";
import { useLaureate } from "@/lib/react-query/hooks/useLaureates";

export function LaureateDetailPage() {
  const { id } = useParams();
  const { data: laureate, isLoading, error } = useLaureate(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !laureate) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 text-center">
        <h1 className="text-2xl font-bold">Lauréat non trouvé</h1>
      </div>
    );
  }

  const aboutContent = (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">
        {laureate.bio || "Aucune description disponible."}
      </p>
    </div>
  );

  // Map API data to component props
  const experiences = laureate.experiences || [];
  const skills = laureate.skills || [];
  const educations = laureate.educations || [];
  const linkedinLink = laureate.externalLinks?.find(
    (link) => link.linkType === "LINKEDIN",
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <LaureateDetailsHeader
          name={laureate.fullName}
          photoUrl={laureate.profilePicture}
          title={laureate.currentPosition}
          major={laureate.major}
          company={laureate.currentCompany?.name}
          location={`${laureate.city}, ${laureate.country}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <InfoSection
              title="À propos"
              content={aboutContent}
              className="bg-white p-6 rounded-lg shadow-sm border"
            />

            {educations.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Formation
                </h2>
                <Timeline
                  items={educations.map((edu) => ({
                    title: edu.degree || edu.title,
                    subtitle: edu.institution,
                    period:
                      edu.period ||
                      `${edu.startYear} - ${edu.endYear || "Present"}`,
                  }))}
                />
              </div>
            )}

            {experiences.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Expériences
                </h2>
                <Timeline
                  items={experiences.map((exp) => ({
                    title: exp.title,
                    subtitle: exp.company,
                    period:
                      exp.period ||
                      `${exp.startDate} - ${exp.endDate || "Present"}`,
                  }))}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {skills.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Compétences
                </h3>
                <SkillsList skills={skills.map((s) => s.name || s)} />
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Liens externes
              </h3>
              <div className="space-y-2">
                {linkedinLink && (
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-main-blue hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {laureate.email && (
                  <a
                    href={`mailto:${laureate.email}`}
                    className="flex items-center gap-2 text-main-blue hover:underline"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
