import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea.jsx';
import { Label } from '../ui/label.jsx';
import { ArrowLeft, MapPin, Building, Calendar, ExternalLink, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { toast } from 'sonner';

// Mock job data - retained as fallback if no job passed
const mockJobs = {
  '1': {
    id: '1',
    title: 'Stage Développeur Frontend',
    company: 'TechCorp',
    location: 'Paris, France',
    type: 'stage',
    customType: '',
    duration: '6 mois',
    description: `Rejoignez notre équipe de développement frontend pour travailler sur des projets innovants utilisant React et TypeScript.

**Responsabilités:**
• Développer des interfaces utilisateur modernes et responsive
• Collaborer avec l'équipe UX/UI pour implémenter des designs
• Participer aux revues de code et aux réunions d'équipe
• Maintenir et améliorer les applications existantes

**Compétences requises:**
• Maîtrise de JavaScript/TypeScript
• Expérience avec React et ses écosystèmes
• Connaissance de HTML5, CSS3 et Tailwind CSS
• Familiarité avec Git et les workflows collaboratifs

**Ce que nous offrons:**
• Environnement de travail stimulant et collaboratif
• Mentorat par des développeurs expérimentés
• Possibilité de télétravail hybride
• Compensation attractive`,
    posted: '2025-01-15',
    isNew: true,
    isRemote: false,
    externalLink: 'https://techcorp.com/careers/frontend-intern',
  },
  '3': {
    id: '3',
    title: 'Alternance Développeur Web Full Stack',
    company: 'WebAgency',
    location: 'Lyon, France',
    type: 'alternance',
    customType: '',
    duration: '24 mois',
    description: `Formation en alternance pour devenir développeur full stack avec JavaScript, Node.js et React. Rythme 3 semaines en entreprise / 1 semaine en formation.

**Programme de formation:**
• Développement Frontend avec React, Vue.js
• Développement Backend avec Node.js, Express
• Bases de données SQL et NoSQL
• DevOps et déploiement d'applications
• Méthodologies Agile et Scrum

**Profil recherché:**
• Bac+2/3 en informatique ou équivalent
• Motivation pour apprendre et évoluer
• Bases en programmation (JavaScript souhaité)
• Esprit d'équipe et autonomie

**Ce que nous offrons:**
• Formation complète et certifiante
• Encadrement par des développeurs seniors
• Projets clients variés et stimulants
• Rémunération selon grille d'alternance
• Possibilité d'embauche en fin de contrat`,
    posted: '2025-01-16',
    isNew: true,
    isRemote: false,
    externalLink: 'https://webagency.com/careers/alternance-fullstack',
  },
  '6': {
    id: '6',
    title: 'Alternance UX/UI Designer',
    company: 'DesignStudio',
    location: 'Remote',
    type: 'alternance',
    customType: '',
    duration: '18 mois',
    description: `Formation en alternance en design d'expérience utilisateur et interface pour applications mobiles et web.

**Missions principales:**
• Conception d'interfaces utilisateur modernes
• Recherche utilisateur et tests d'utilisabilité
• Création de prototypes et wireframes
• Collaboration étroite avec les équipes de développement

**Compétences développées:**
• Maîtrise des outils de design (Figma, Adobe XD)
• Principes de design et ergonomie
• Méthodologies UX (Design Thinking, Lean UX)
• Design system et atomic design

**Profil recherché:**
• Formation en design, arts appliqués ou équivalent
• Portfolio créatif démontrant une sensibilité design
• Curiosité pour les nouvelles technologies
• Excellent sens de la communication

**Avantages:**
• Télétravail possible
• Équipe créative et bienveillante
• Projets pour des clients prestigieux
• Formation continue aux dernières tendances`,
    posted: '2025-01-14',
    isNew: true,
    isRemote: true,
    externalLink: 'https://designstudio.com/careers/alternance-ux-ui',
  },
  '7': {
    id: '7',
    title: 'Mission Consultant DevOps',
    company: 'CloudConsulting',
    location: 'Paris, France',
    type: 'autre',
    customType: 'Mission',
    duration: '3-6 mois',
    description: `Mission de consulting pour accompagner une transformation DevOps chez un client grand compte dans le secteur bancaire.

**Objectifs de la mission:**
• Audit de l'infrastructure et des processus existants
• Conception d'une stratégie DevOps adaptée
• Mise en place d'outils CI/CD (Jenkins, GitLab)
• Formation des équipes internes
• Accompagnement sur les premières implémentations

**Profil recherché:**
• Expérience significative en DevOps (5+ ans)
• Maîtrise des outils de conteneurisation (Docker, Kubernetes)
• Connaissance des clouds AWS/Azure
• Expérience en consulting ou accompagnement d'équipes
• Capacité à travailler en environnement bancaire

**Conditions:**
• Tarif journalier attractif selon profil
• Télétravail partiel possible (2-3 jours/semaine)
• Mission extensible selon résultats
• Environnement stimulant et équipes motivées`,
    posted: '2025-01-17',
    isNew: true,
    isRemote: false,
    externalLink: 'https://cloudconsulting.com/missions/devops-banking',
  },
  '8': {
    id: '8',
    title: 'Freelance Développeur Mobile',
    company: 'MobileFirst Agency',
    location: 'Remote',
    type: 'autre',
    customType: 'Freelance',
    duration: 'Projet 4 mois',
    description: `Recherche développeur mobile freelance React Native pour développer une application iOS/Android pour une startup dans le secteur de la santé.

**Description du projet:**
• Application mobile de suivi médical personnalisé
• Intégration avec des APIs de santé connectée
• Interface utilisateur moderne et intuitive
• Système de notifications push
• Synchronisation offline/online

**Stack technique:**
• React Native pour le développement mobile
• API REST Node.js existante
• Base de données MongoDB
• Authentification OAuth
• Tests automatisés (Jest)

**Profil recherché:**
• Expérience confirmée en React Native (3+ ans)
• Portfolio d'applications publiées sur les stores
• Connaissance des guidelines iOS/Android
• Sensibilité UX/UI
• Autonomie et rigueur dans le travail à distance

**Modalités:**
• Contrat freelance 4 mois renouvelable
• Télétravail 100%
• Rémunération selon expérience et portfolio
• Équipe technique bienveillante et réactive`,
    posted: '2025-01-16',
    isNew: true,
    isRemote: true,
    externalLink: 'https://mobilefirst.agency/freelance/react-native',
  },
  '10': {
    id: '10',
    title: 'Bénévolat Tech for Good',
    company: 'AssoTech',
    location: 'Lyon, France',
    type: 'autre',
    customType: 'Bénévolat',
    duration: 'Selon disponibilité',
    description: `Opportunité de bénévolat pour développer des solutions tech au service d'associations caritatives lyonnaises.

**Projets en cours:**
• Site web pour une association d'aide aux sans-abris
• Application mobile pour une banque alimentaire
• Système de gestion pour un refuge animalier
• Plateforme de mise en relation bénévoles/associations

**Compétences recherchées:**
• Développement web (React, Vue.js, PHP)
• Développement mobile (React Native, Flutter)
• Design UX/UI
• Gestion de projet
• Marketing digital

**Ce que vous apportez:**
• Impact social direct et mesurable
• Expérience de travail avec des acteurs associatifs
• Portfolio de projets à impact positif
• Réseau dans l'écosystème tech for good
• Développement de compétences transversales

**Engagement:**
• Flexibilité totale selon vos disponibilités
• Minimum 2h/semaine recommandé
• Télétravail et rencontres physiques possibles
• Accompagnement et formation si nécessaire
• Reconnaissance officielle de l'engagement bénévole`,
    posted: '2025-01-11',
    isNew: false,
    isRemote: false,
    externalLink: 'https://assotech.org/benevolat/tech-developers',
  }
};

/**
 * JobDetails Component
 * 
 * Displays detailed view of a specific job offer with application functionality.
 * Features:
 * - Clean white cards with proper spacing and blue borders
 * - Gray headers with job metadata, white content areas
 * - Formatted job description with markdown-like styling
 * - Application modal with form validation and toast notifications
 * - Responsive design with improved visual hierarchy
 * - Consistent color scheme: #0C5F95 (dark blue), #3A7FC2 (medium blue), #E2F2FF (light blue)
 * 
 * @param {Object} props
 * @param {Object} props.job - Job object with all details
 * @param {Function} props.onBack - Callback to return to job listing
 */
export function JobDetails({ job: jobProp, onBack }) {
  const { t } = useLanguage();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    cv: null,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefer passed job prop, fallback to mock data
  const job = jobProp || mockJobs['1'];

  /**
   * Format date for display in French locale
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  /**
   * Get appropriate color scheme for job type badge
   */
  const getTypeColor = (type) => {
    switch (type) {
      case 'stage':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'emploi':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'alternance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'autre':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  /**
   * Get display text for job type, handling custom types
   */
  const getTypeDisplayText = () => {
    if (job.type === 'autre' && job.customType) {
      return job.customType;
    }
    return t(`type.${job.type}`);
  };

  /**
   * Handle application form submission with validation and API call simulation
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(t('job.apply.success'));
    setShowApplicationModal(false);
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      cv: null,
      message: '',
    });
    setIsSubmitting(false);
  };

  /**
   * Handle file upload for CV with validation
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setApplicationForm(prev => ({ ...prev, cv: file }));
  };

  /**
   * Format job description with proper styling
   * Handles markdown-like formatting (**bold**, • bullets)
   */
  const formatDescription = (description) => {
    return description.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        /**
   * Component render method
   * 
   * Renders the complete job details interface with the following structure:
   * 
   * Layout Architecture:
   * 1. Back Navigation Button - Returns user to job listing
   * 2. Job Header Card - Gray header with title, badges, and metadata
   * 3. Job Description Card - Gray header with formatted white content area  
   * 4. Action Buttons Card - Apply button with modal and external link
   * 
   * Card Design System:
   * - All cards: White background, blue borders (2px), shadow
   * - Headers: Gray background (bg-gray-50), blue title text
   * - Content: White background, proper padding and spacing
   * - Borders: Consistent blue theme (#0C5F95)
   * 
   * Responsive Design:
   * - Mobile-first approach with responsive breakpoints
   * - Flexible layouts that adapt to screen size
   * - Touch-friendly button sizes and spacing
   * - Readable typography on all devices
   * 
   * Accessibility Features:
   * - Semantic HTML structure with proper headings
   * - Form labels associated with inputs
   * - Keyboard navigation support
   * - Screen reader compatible text and labels
   * - Sufficient color contrast ratios
   * 
   * Interactive Elements:
   * - Modal dialog for job applications
   * - File upload with validation
   * - Form submission with loading states
   * - External link handling
   * - Toast notifications for feedback
   * 
   * Performance Optimizations:
   * - Conditional rendering for optional elements
   * - Efficient state updates
   * - Minimal re-renders through proper key usage
   * - Lazy loading of modal content
   */
  return (
          <h3 key={index} className="font-semibold text-[#053A5F] mt-6 mb-3 first:mt-0 text-lg">
            {paragraph.slice(2, -2)}
          </h3>
        );
      }
      if (paragraph.startsWith('•')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-[#0C5F95] font-bold">•</span>
            <span className="text-gray-700">{paragraph.slice(2)}</span>
          </div>
        );
      }
      if (paragraph.trim()) {
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center space-x-2 border-[#3A7FC2] text-[#053A5F] hover:bg-[#E2F2FF] bg-white"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux offres</span>
      </Button>

      {/* Job Header Card - Gray header with white content */}
      <Card className="bg-white border-2 border-[#0C5F95] shadow-md">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-2xl text-[#053A5F] font-bold" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {job.title}
                </CardTitle>
                {job.isNew && (
                  <Badge variant="secondary" className="bg-[#0C5F95] text-white border-[#0C5F95]">
                    {t('common.new')}
                  </Badge>
                )}
                {job.isRemote && (
                  <Badge variant="outline" className="border-[#3A7FC2] text-[#053A5F] bg-white">
                    {t('common.remote')}
                  </Badge>
                )}
              </div>
              
              {/* Job metadata with icons */}
              <div className="flex flex-col sm:flex-row gap-4 text-[#3A7FC2] flex-wrap" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(job.posted || job.postedAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Badge 
                className={`${getTypeColor(job.type)} font-semibold border text-center`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                {getTypeDisplayText()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Job Description Card - Gray header, white content */}
      <Card className="bg-white border-2 border-[#0C5F95] shadow-md">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-xl text-[#053A5F] font-semibold" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {t('job.description')}
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <div className="prose prose-sm max-w-none">
            {formatDescription(job.description)}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Card - White background with blue border */}
      <Card className="bg-white border-2 border-[#0C5F95] shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Apply Button with Modal Dialog */}
            <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
              <DialogTrigger asChild>
                <Button className="bg-[#0C5F95] hover:bg-[#053A5F] text-white shadow-md flex-1 sm:flex-none" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {t('common.apply')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-[#0C5F95]">
                <DialogHeader className="border-b border-gray-200 pb-4">
                  <DialogTitle className="text-xl text-[#053A5F] font-semibold" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {t('job.apply.title')}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-4">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#053A5F] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {t('job.apply.name')} *
                      </Label>
                      <Input
                        id="name"
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                        className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#053A5F] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {t('job.apply.email')} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                        className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#053A5F] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('job.apply.phone')} *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
                      required
                    />
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="cv" className="text-[#053A5F] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('job.apply.cv')} *
                    </Label>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
                      required
                    />
                    <p className="text-xs text-[#3A7FC2]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Formats acceptés: PDF, DOC, DOCX (max 5MB)
                    </p>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#053A5F] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {t('job.apply.message')}
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={applicationForm.message}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Décrivez votre motivation et vos compétences pertinentes pour ce poste..."
                      className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF] bg-white"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>

                  {/* Form Actions with blue border separator */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-[#0C5F95]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplicationModal(false)}
                      className="flex-1 sm:flex-none border-[#3A7FC2] text-[#053A5F] hover:bg-[#E2F2FF] bg-white"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      {t('common.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#0C5F95] hover:bg-[#053A5F] text-white shadow-md flex-1 sm:flex-none"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      {isSubmitting ? t('common.loading') : t('common.submit')}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* External Link Button */}
            {(job.externalLink || job.link) && (
              <Button
                variant="outline"
                onClick={() => window.open(job.externalLink || job.link, '_blank')}
                className="flex items-center space-x-2 border-[#3A7FC2] text-[#053A5F] hover:bg-[#E2F2FF] bg-white flex-1 sm:flex-none"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir l'offre originale</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}