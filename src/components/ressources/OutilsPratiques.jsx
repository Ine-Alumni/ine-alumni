import DropDownMenu from "../../../DropDownMenu";
import { useState } from "react";

export default function OutilsPratiques() {
  const [selected, setSelected] = useState('');

  const outils = [
    {
      name: "Prettier",
      type: "VSCode Extension",
      description: "A description..."
    },
    {
      name: "VSCode",
      type: "Logiciel",
      description: "Another description..."
    },
    {
      name: "WebStorm",
      type: "IDE",
      description: "Powerful IDE for JavaScript."
    },
    {
      name: "Ubuntu VM",
      type: "Machine Virtuelle Préconfigurée",
      description: "A preconfigured Linux environment."
    },
  ];

  const handleChange = (value) => {
    setSelected(value);
  };

  const filteredOutils = selected
  ? outils.filter((outil) =>
      outil.type.toLowerCase().includes(selected.toLowerCase())
    )
  : outils;


  return (
    <>
      <DropDownMenu onChange={handleChange} />
      <div className="flex flex-col items-center gap-6 px-4 mt-8">
        {filteredOutils.map((outil, index) => (
          <div
            key={index}
            className="flex flex-row w-300 p-6 border border-gray-400 rounded-xl shadow-md"
          >
            <img
              src="https://cdn-media-0.freecodecamp.org/size/w2000/2024/03/Prettier.png"
              className="h-16 mr-10 rounded-md"
              alt={outil.name}
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-bold mb-2">
                "{outil.name}" : {outil.type}
              </h2>
              <p className="text-sm text-gray-700">{outil.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
