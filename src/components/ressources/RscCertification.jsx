export default function RscCertification(){
  const outils = [
    {
      name: "IBM AI Fundamentals Badge",
      field: "Artificial Intelligence (AI)",
      description:
        "This certification validates understanding of artificial intelligence fundamentals and its practical applications in business."
    },
    {
      name: "IBM AI Fundamentals Badge",
      field: "Artificial Intelligence (AI)",
      description:
        "This certification validates understanding of artificial intelligence fundamentals and its practical applications in business.",
    },
    {
      name: "IBM AI Fundamentals Badge",
      field: "Artificial Intelligence (AI)",
      description:
        "This certification validates understanding of artificial intelligence fundamentals and its practical applications in business.",
    },
    {
      name: "IBM AI Fundamentals Badge",
      field: "Artificial Intelligence (AI)",
      description:
        "This certification validates understanding of artificial intelligence fundamentals and its practical applications in business.",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-6 px-4 mt-8 justify-center">
      {outils.map((outil, index) => (
        <div className="flex flex-row w-300 p-6 border border-gray-400 rounded-xl shadow-md">
          <img src="https://th.bing.com/th/id/OIP.4usehIOUmZt_7--Ccw6JRAAAAA?w=216&h=216&c=7&r=0&o=7&pid=1.7&rm=3" className="h-12 mr-7 mt-1"/>
          <div
            key={index}
            className="flex flex-col"
          >
            <h2 className="text-lg font-bold mb-2">
              "{outil.name}" : {outil.field}
            </h2>
            <p className="text-sm text-gray-700">
              {outil.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}