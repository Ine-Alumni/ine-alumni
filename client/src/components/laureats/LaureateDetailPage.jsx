import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { LaureateDetailsHeader } from "@/components/laureats/LaureateDetailsHeader";
import { Timeline } from "@/components/common/Timeline";
import { SkillsList } from "@/components/laureats/SkillsList";
import { InfoSection } from "@/components/common/InfoSection";
import { laureatsService } from "@/services/laureatsService";

export function LaureateDetailPage() {
  const { id } = useParams();
  const [laureate, setLaureate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaureateDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await laureatsService.getLaureateById(id);
        setLaureate(data);
      } catch (err) {
        console.error("Error fetching laureate details:", err);
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLaureateDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
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

  const aboutContent = laureate.bio ? (
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed">{laureate.bio}</p>
    </div>
  ) : (
    <p className="text-gray-500 italic">Aucune biographie disponible</p>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <LaureateDetailsHeader
          name={laureate.fullName}
          photoUrl={laureate.profilePicture}
          title={laureate.currentPosition || "Poste non spécifié"}
          major={laureate.major}
          company={laureate.currentCompany?.name || "Entreprise non spécifiée"}
          location={`${laureate.city || ""}${laureate.city && laureate.country ? ", " : ""}${laureate.country || ""}`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <InfoSection
              title="À propos"
              content={aboutContent}
              className="bg-white p-6 rounded-lg shadow-sm border"
            />

            {laureate.educations && laureate.educations.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Formation
                </h2>
                <Timeline
                  items={laureate.educations.map((edu) => ({
                    title: edu.degree,
                    subtitle: edu.institution,
                    period: `${edu.startDate || ""} - ${edu.endDate || ""}`,
                    description: edu.fieldOfStudy,
                  }))}
                />
              </div>
            )}

            {laureate.experiences && laureate.experiences.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Expériences
                </h2>
                <Timeline
                  items={laureate.experiences.map((exp) => ({
                    title: exp.position,
                    subtitle:
                      typeof exp.company === "object"
                        ? exp.company?.name
                        : exp.company,
                    period: `${exp.startDate || ""} - ${exp.endDate || exp.current ? "Présent" : ""}`,
                    description: exp.description,
                  }))}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {laureate.skills && laureate.skills.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Compétences
                </h3>
                <SkillsList
                  skills={laureate.skills.map((skill) => skill.name)}
                />
              </div>
            )}

            {laureate.externalLinks && laureate.externalLinks.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Liens externes
                </h3>
                <div className="space-y-2">
                  {laureate.externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-main-blue hover:underline"
                    >
                      {link.platform || link.url}
                    </a>
                  ))}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
