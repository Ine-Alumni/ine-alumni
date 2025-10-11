import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronRight, Info, Award, Briefcase, GraduationCap, Edit, Camera } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('experiences');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    promo: "",
    avatar: null,
    about: "",
    socialLinks: {
      github: "",
      linkedin: "",
      whatsapp: "",
      email: ""
    },
    competences: [],
    experiences: [],
    formation: []
  });

  const menuItems = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'competences', label: 'Competences', icon: Award },
    { id: 'experiences', label: 'Expériences', icon: Briefcase },
    { id: 'formation', label: 'Formation', icon: GraduationCap }
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Erreur lors du chargement du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        alert('Profil sauvegardé avec succès !');
        setIsEditing(false);
      } else {
        alert('Erreur lors de la sauvegarde du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarData = reader.result;
        
        handleInputChange('avatar', avatarData);
        
        try {
          const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ avatar: avatarData })
          });

          if (response.ok) {
            alert('Photo de profil mise à jour !');
          } else {
            alert('Erreur lors de la mise à jour de la photo');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur de connexion au serveur');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteItem = async (section, id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      setProfile(prev => ({
        ...prev,
        [section]: prev[section].filter(item => item.id !== id)
      }));
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'about':
        return (
          <div className="space-y-3">
            {isEditing ? (
              <textarea
                value={profile.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F99BC] min-h-32"
                placeholder="Décrivez votre parcours professionnel..."
              />
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">
                {profile.about || "Aucune description disponible. Cliquez sur modifier pour ajouter une description."}
              </p>
            )}
          </div>
        );
      
      case 'competences':
        return (
          <div className="flex flex-wrap gap-2">
            {profile.competences.length > 0 ? (
              profile.competences.map((skill, index) => (
                <div key={index} className="relative group">
                  <span className="px-3 py-1.5 bg-[#6F99BC]/20 text-[#3A7FC2] rounded text-sm font-medium border border-[#6F99BC]/30">
                    {skill}
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => {
                        setProfile(prev => ({
                          ...prev,
                          competences: prev.competences.filter((_, i) => i !== index)
                        }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))
            ) : (
              !isEditing && <p className="text-gray-500 text-sm">Aucune compétence ajoutée. Cliquez sur modifier pour en ajouter.</p>
            )}
            {isEditing && (
              <button 
                onClick={() => {
                  const newSkill = prompt('Ajouter une compétence:');
                  if (newSkill && newSkill.trim()) {
                    setProfile(prev => ({
                      ...prev,
                      competences: [...prev.competences, newSkill.trim()]
                    }));
                  }
                }}
                className="px-3 py-1.5 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white rounded text-sm font-medium"
              >
                + Ajouter
              </button>
            )}
          </div>
        );
      
      case 'experiences':
        return (
          <div className="space-y-4">
            {profile.experiences.length > 0 ? (
              profile.experiences.map((exp, index) => (
                <div key={exp.id} className="flex gap-2">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#6F99BC]"></div>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleArrayItemChange('experiences', index, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-sm"
                          placeholder="Titre du poste"
                        />
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => handleArrayItemChange('experiences', index, 'period', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                          placeholder="Période (ex: 2020-2023)"
                        />
                        <button
                          onClick={() => handleDeleteItem('experiences', exp.id)}
                          className="text-red-500 text-xs hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-gray-900 font-medium text-sm">{exp.title}</h3>
                        <p className="text-[#3A7FC2] text-xs mt-0.5">{exp.period}</p>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !isEditing && <p className="text-gray-500 text-sm">Aucune expérience ajoutée. Cliquez sur modifier pour en ajouter.</p>
            )}
            <div className='flex justify-center'>
              {isEditing && (
                <button 
                  onClick={() => {
                    const newTitle = prompt('Titre de l\'expérience:');
                    if (newTitle && newTitle.trim()) {
                      const newPeriod = prompt('Période (ex: 2020-2023):');
                      if (newPeriod && newPeriod.trim()) {
                        setProfile(prev => ({
                          ...prev,
                          experiences: [...prev.experiences, {
                            id: Date.now(),
                            title: newTitle.trim(),
                            period: newPeriod.trim()
                          }]
                        }));
                      }
                    }
                  }}
                  className="px-3 py-1.5 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white rounded text-sm font-medium"
                >
                  + Ajouter une expérience
                </button>
              )}
            </div>
          </div>
        );
      
      case 'formation':
        return (
          <div className="space-y-4">
            {profile.formation.length > 0 ? (
              profile.formation.map((form, index) => (
                <div key={form.id} className="flex gap-2">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#6F99BC]"></div>
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) => handleArrayItemChange('formation', index, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-sm"
                          placeholder="Titre du diplôme"
                        />
                        <input
                          type="text"
                          value={form.institution}
                          onChange={(e) => handleArrayItemChange('formation', index, 'institution', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                          placeholder="Nom de l'institution"
                        />
                        <input
                          type="text"
                          value={form.period}
                          onChange={(e) => handleArrayItemChange('formation', index, 'period', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                          placeholder="Période (ex: 2020-2024)"
                        />
                        <button
                          onClick={() => handleDeleteItem('formation', form.id)}
                          className="text-red-500 text-xs hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-gray-900 font-medium text-sm">{form.title}</h3>
                        <p className="text-gray-600 text-xs">{form.institution}</p>
                        <p className="text-[#3A7FC2] text-xs mt-0.5">{form.period}</p>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              !isEditing && <p className="text-gray-500 text-sm">Aucune formation ajoutée. Cliquez sur modifier pour en ajouter.</p>
            )}
            <div className='flex justify-center'>
              {isEditing && (
                <button 
                  onClick={() => {
                    const newTitle = prompt('Titre de formation:');
                    if (newTitle && newTitle.trim()) {
                      const newInstitution = prompt('Nom de l\'institution:');
                      if (newInstitution && newInstitution.trim()) {
                        const newPeriod = prompt('Période (ex: 2020-2023):');
                        if (newPeriod && newPeriod.trim()) {
                          setProfile(prev => ({
                            ...prev,
                            formation: [...prev.formation, {
                              id: Date.now(),
                              title: newTitle.trim(),
                              institution: newInstitution.trim(),
                              period: newPeriod.trim()
                            }]
                          }));
                        }
                      }
                    }
                  }}
                  className="px-3 py-1.5 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white rounded text-sm font-medium"
                >
                  + Ajouter une formation
                </button>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isLoading && !profile.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A7FC2] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto space-y-4" style={{ maxWidth: '1060px' }}>
        <div className="bg-white rounded-lg border border-gray-200 p-8 relative">
          
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden group">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                )}

                <label className="absolute inset-0 flex flex-col items-center justify-center bg-[#6F99BC] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white mb-1" />
                  <span className="text-white text-xs font-medium">Charger la photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-[#3A7FC2] text-center mt-2">Cliquez pour modifier</p>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-gray-900 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC]"
                    placeholder="Votre nom complet"
                  />
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="text-[#3A7FC2] text-sm w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC]"
                    placeholder="Votre titre professionnel"
                  />
                  <input
                    type="text"
                    value={profile.promo}
                    onChange={(e) => handleInputChange('promo', e.target.value)}
                    className="text-sm w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC]"
                    placeholder="Votre promotion (ex: Aseds 2020)"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {profile.name || "Nom non renseigné"}
                  </h1>
                  <p className="text-[#3A7FC2] text-sm mb-4">
                    {profile.title || "Titre non renseigné"}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-700">Promo: </span>
                    <span className="text-sm text-[#3A7FC2]">
                      {profile.promo || "Non renseigné"}
                    </span>
                  </div>
                </>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2 w-64">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <input
                    type="text"
                    value={profile.socialLinks.github}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, github: e.target.value }
                    }))}
                    placeholder="URL GitHub"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <input
                    type="text"
                    value={profile.socialLinks.linkedin}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                    }))}
                    placeholder="URL LinkedIn"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <input
                    type="text"
                    value={profile.socialLinks.whatsapp}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, whatsapp: e.target.value }
                    }))}
                    placeholder="Numéro WhatsApp"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <input
                    type="email"
                    value={profile.socialLinks.email}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, email: e.target.value }
                    }))}
                    placeholder="Email"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6F99BC] text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    if (!profile.socialLinks.github) {
                      alert('Veuillez remplir votre lien GitHub en cliquant sur modifier');
                    } else {
                      window.open(profile.socialLinks.github, '_blank');
                    }
                  }}
                  className={`p-2 hover:bg-gray-100 rounded ${!profile.socialLinks.github ? 'opacity-50' : ''}`}
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </button>
                
                <button 
                  onClick={() => {
                    if (!profile.socialLinks.linkedin) {
                      alert('Veuillez remplir votre lien LinkedIn en cliquant sur modifier');
                    } else {
                      window.open(profile.socialLinks.linkedin, '_blank');
                    }
                  }}
                  className={`p-2 hover:bg-gray-100 rounded ${!profile.socialLinks.linkedin ? 'opacity-50' : ''}`}
                >
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </button>
                
                <button 
                  onClick={() => {
                    if (!profile.socialLinks.whatsapp) {
                      alert('Veuillez remplir votre numéro WhatsApp en cliquant sur modifier');
                    } else {
                      window.open(`https://wa.me/${profile.socialLinks.whatsapp}`, '_blank');
                    }
                  }}
                  className={`p-2 hover:bg-gray-100 rounded ${!profile.socialLinks.whatsapp ? 'opacity-50' : ''}`}
                >
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    if (!profile.socialLinks.email) {
                      alert('Veuillez remplir votre email en cliquant sur modifier');
                    } else {
                      window.location.href = `mailto:${profile.socialLinks.email}`;
                    }
                  }}
                  className={`p-2 hover:bg-gray-100 rounded ${!profile.socialLinks.email ? 'opacity-50' : ''}`}
                >
            

                  <Mail className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left transition ${
                      isActive 
                        ? 'bg-[#6F99BC]/20 text-[#3A7FC2] border-l-4 border-[#6F99BC]' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#3A7FC2] hover:bg-[#2c6aab] text-white rounded transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleEdit}
                  className="p-2 text-[#3A7FC2] hover:bg-[#6F99BC]/10 rounded"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
              {activeSection}
            </h2>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}