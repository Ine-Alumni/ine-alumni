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

// Mock job data - retained only as fallback if no job passed
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

  // Prefer prop; fallback to first mock
  const job = jobProp || mockJobs['1'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'stage':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'emploi':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'alternance':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'autre':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeDisplayText = () => {
    if (job.type === 'autre' && job.customType) {
      return job.customType;
    }
    return t(`type.${job.type}`);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setApplicationForm(prev => ({ ...prev, cv: file }));
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux offres</span>
      </Button>

      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                {job.isNew && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {t('common.new')}
                  </Badge>
                )}
                {job.isRemote && (
                  <Badge variant="outline">
                    {t('common.remote')}
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground flex-wrap">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>{job.company}</span>
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
                className={getTypeColor(job.type)}
              >
                {getTypeDisplayText()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>{t('job.description')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-text-gray-700">
            {job.description.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="font-semibold text-foreground mt-6 mb-3">
                    {paragraph.slice(2, -2)}
                  </h3>
                );
              }
              if (paragraph.startsWith('•')) {
                return (
                  <div key={index} className="flex items-start space-x-2 mb-2">
                    <span className="text-primary">•</span>
                    <span>{paragraph.slice(2)}</span>
                  </div>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                );
              }
              return <br key={index} />;
            })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex-1 sm:flex-none">
              {t('common.apply')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('job.apply.title')}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('job.apply.name')}</Label>
                  <Input
                    id="name"
                    value={applicationForm.name}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('job.apply.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('job.apply.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cv">{t('job.apply.cv')}</Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('job.apply.message')}</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={applicationForm.message}
                  onChange={(e) => setApplicationForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Décrivez votre motivation et vos compétences..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 sm:flex-none"
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md flex-1 sm:flex-none"
                >
                  {isSubmitting ? t('common.loading') : t('common.submit')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {(job.externalLink || job.link) && (
          <Button
            variant="outline"
            onClick={() => window.open(job.externalLink || job.link, '_blank')}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Voir l'offre originale</span>
          </Button>
        )}
      </div>
    </div>
  );
} 