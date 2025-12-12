// src/components/EventMenu/EventMenu.jsx
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const EventMenu = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
          >
            Modifier
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default EventMenu;
