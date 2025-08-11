import { useState } from "react";

export default function DropDownMenu({onChange}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left left-275">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-center w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
      >
        Options
        <svg
          className="w-5 h-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => onChange('Logiciel')}>
              Logiciel
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => onChange('Extension')}>
              Extension
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => onChange('Machine Virtuelle Préconfigurée')}>
              Machine Virtuelle Préconfigurée
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => onChange('IDE')}>
              IDE
            </button>
            <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => onChange("")}
            >
              All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
