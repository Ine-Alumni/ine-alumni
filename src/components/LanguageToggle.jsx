import { useState } from 'react';

function LanguageToggle() {
const [language, setLanguage] = useState('fr'); 

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
    };

    return (
        <button
        className="ml-2 p-2 hover:bg-gray-100 rounded"
        onClick={toggleLanguage}
        >
        <img
            src={
            language === 'fr'
                ? '/assets/icons/fr.svg'  
                : '/assets/icons/en.svg'  
            }
            alt="Language"
            className="w-10 h-10"
        />
        </button>
    );
}

export default LanguageToggle;
