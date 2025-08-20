import { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, MapPin, Building, Calendar, Filter, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

// API mapping helper
const mapApiOfferToUi = (o) => {
  const type = (o.type || '').toLowerCase();
  const mappedType = type === 'internship' ? 'stage'
    : type === 'job' ? 'emploi'
    : type === 'alternance' ? 'alternance'
    : 'autre';
  const customType = type === 'benevolat' ? 'Bénévolat' : (o.customType || '');
  const posted = o.postedAt || new Date().toISOString();
  const isNew = (() => {
    try {
      const d = new Date(posted);
      return (Date.now() - d.getTime()) <= 7 * 24 * 60 * 60 * 1000;
    } catch { return false; }
  })();
  return {
    id: String(o.id),
    title: o.title,
    company: o.company,
    location: o.location,
    type: mappedType,
    customType,
    duration: o.duration || '',
    description: o.description || '',
    posted,
    isNew,
    isRemote: false,
    externalLink: o.link || null,
    __raw: o,
  };
};

export function JobListing({ onJobSelect }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/offers`);
        if (!res.ok) throw new Error('Failed to load offers');
        const data = await res.json();
        if (isMounted) setJobs((data || []).map(mapApiOfferToUi));
      } catch (e) {
        if (isMounted) setError(e.message || 'Error');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Get unique companies and locations for filter options
  const companies = [...new Set(jobs.map(job => job.company))];
  const locations = [...new Set(jobs.map(job => job.location))];

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (job.customType && job.customType.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
      
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchTerm, typeFilter, locationFilter]);

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
        return 'bg-[#E2F2FF] text-[#053A5F]';
      case 'emploi':
        return 'bg-[#E2F2FF] text-[#053A5F]';
      case 'alternance':
        return 'bg-[#E2F2FF] text-[#053A5F]';
      case 'autre':
        return 'bg-[#E2F2FF] text-[#053A5F]';
      default:
        return 'bg-[#F6F6F6] text-[#053A5F]';
    }
  };

  const getTypeDisplayText = (job) => {
    if (job.type === 'autre' && job.customType) {
      return job.customType;
    }
    return t(`type.${job.type}`);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[22px] font-bold text-[#053A5F]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {t('jobs.title')}
        </h1>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 md:hidden border-[#3A7FC2] text-[#053A5F] hover:bg-[#E2F2FF]"
        >
          <Filter className="w-4 h-4" />
          <span>{t('common.filter')}</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A7FC2] w-4 h-4" />
        <Input
          placeholder={t('jobs.search.placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF]"
          style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
        />
      </div>

      {/* Filters */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF]">
            <SelectValue placeholder={t('jobs.filter.type')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('type.all')}</SelectItem>
            <SelectItem value="stage">{t('type.stage')}</SelectItem>
            <SelectItem value="alternance">{t('type.alternance')}</SelectItem>
            <SelectItem value="emploi">{t('type.emploi')}</SelectItem>
            <SelectItem value="autre">{t('type.autre')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="border-[#3A7FC2] focus:border-[#0C5F95] focus:ring-[#E2F2FF]">
            <SelectValue placeholder={t('jobs.filter.location')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les lieux</SelectItem>
            {locations.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm('');
            setTypeFilter('all');
            setLocationFilter('all');
          }}
          className="border-[#3A7FC2] text-[#053A5F] hover:bg-[#E2F2FF]"
        >
          {t('common.reset')}
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#3A7FC2]" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
        {loading ? 'Chargement...' : error ? 'Erreur de chargement' : `${filteredJobs.length} résultat(s)`}
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card className="p-8 text-center bg-[#E2F2FF] border-[#3A7FC2]">
            <p className="text-[#053A5F]" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
              {t('jobs.no_results')}
            </p>
          </Card>
        ) : (
          filteredJobs.map(job => (
            <Card 
              key={job.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-[#3A7FC2] bg-[#E2F2FF] hover:bg-[#F6F6F6]"
              onClick={() => onJobSelect(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-[18px] font-semibold text-[#053A5F]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {job.title}
                      </CardTitle>
                      {job.isNew && (
                        <Badge variant="secondary" className="bg-[#0C5F95] text-white">
                          {t('common.new')}
                        </Badge>
                      )}
                      {job.isRemote && (
                        <Badge variant="outline" className="border-[#3A7FC2] text-[#053A5F]">
                          {t('common.remote')}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-[#3A7FC2] flex-wrap gap-y-1" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(job.posted)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    className={`${getTypeColor(job.type)} font-semibold`}
                    style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
                  >
                    {getTypeDisplayText(job)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#053A5F] line-clamp-2" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}>
                  {job.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 