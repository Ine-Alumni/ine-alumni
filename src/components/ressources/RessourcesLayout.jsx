import { Outlet } from "react-router";
import { Link } from "react-router";
import { useState } from "react";

export default function RessourcesLayout() {
  const [activeTab, setActiveTab] = useState("textuelles");
  const tabs = [
    { key: "textuelles", label: "Ressources textuelles" },
    { key: "interactives", label: "Ressources interactives" },
    { key: "outils", label: "Outils pratiques" },
    { key: "certification", label: "Ressources de certification" },
  ];

  const placeholderContent = function(){
    switch(activeTab) {
    case "textuelles":
      return "Rechercher par titre, auteur, technologie...";
    case "interactives":
      return "Rechercher par nom, catégorie...";
    case "outils":
      return "Rechercher par nom, type...";
    case "certification" :
      return "Rechercher par nom, domaine...";
    }
 }      
  return (
    <>
      <h1 className="text-xl font-bold mx-10 mt-25 mb-1">Ressources</h1>
      <p className="text-gray-500 text-sm mx-10 mt-1.5">
        Bénéficiez de notre collection de ressources variées pour enrichir votre
        apprentissage et maximiser votre réussite académique
      </p>

      <div className="flex justify-between mx-25 mt-13 text-xs font-bold text-blue-500">
        {tabs.map((tab) => (
          <Link key={tab.key} to={`/ressources/${tab.key}`}>
            <button
              onClick={() => {
                setActiveTab(tab.key);
              }}
              className={`px-4 py-2 transition duration-200 h-10 w-60
            ${
              activeTab === tab.key
                ? "rounded-t-md shadow-[0_-3.5px_5px_rgba(0,0,0,0.25)] mb-10" 
                : "text-blue-500 hover:text-blue-600 hover:cursor-pointer"
            }`}
            >
              {tab.label}
            </button>
          </Link>
        ))}
      </div>

      <div className="relative text-gray-600 flex flex-row justify-center mb-15">
        <input
          type="search"
          name="search"
          placeholder= {placeholderContent()}
          className="bg-white h-10 px-5 w-100 pr-10 rounded-full text-sm focus:outline-none border border-gray-400"
        />
        <button type="submit" className="relative right-9 bottom-1.5 mt-3 mr-4">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="200px"
            height="200px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <Outlet />
      <div className="mb-15"/>
    </>
  );
}
