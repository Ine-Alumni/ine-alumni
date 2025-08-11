
export default function Interactives() {
  const websites = [
    {
      name: "W3Schools",
      category: "Website",
      description:
        "This online web development tutorial platform provides comprehensive learning resources and reference materials for web technologies and programming languages.",
    },
    {
      name: "W3Schools",
      category: "Website",
      description:
        "This online web development tutorial platform provides comprehensive learning resources and reference materials for web technologies and programming languages. ",
    },
    {
      name: "W3Schools",
      category: "Website",
      description:
        "This online web development tutorial platform provides comprehensive learning resources and reference materials for web technologies and programming languages.",
    },
    {
      name: "W3Schools",
      category: "Website",
      description:
        "This online web development tutorial platform provides comprehensive learning resources and reference materials for web technologies and programming languages.",
    },
  ];
  return (
    <>    
    <div 
      className="flex flex-col items-center gap-6 px-4 mt-8"
    >
      {websites.map((website, index) => (
        <div
          key={index}
          className="w-300 p-6 border border-gray-400 rounded-xl shadow-md"
        >
          <h2 
            className="text-lg font-bold mb-2">
              "{website.name}" ({website.category})
          </h2>
          <p 
            className="text-sm text-gray-700">
              {website.description}
          </p>
        </div>
      ))}
    </div>
    </>
    
  );
}
