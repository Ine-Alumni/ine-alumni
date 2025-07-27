export default function RscTextuelles() {
  const ebooks = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description:
        "Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. What kind of work will you be doing? You’ll be reading code―lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly you will be challenged to... ",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description:
        "Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. What kind of work will you be doing? You’ll be reading code―lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly you will be challenged to... ",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description:
        "Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. What kind of work will you be doing? You’ll be reading code―lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly you will be challenged to... ",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description:
        "Noted software expert Robert C. Martin, presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. What kind of work will you be doing? You’ll be reading code―lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly you will be challenged to... ",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-6 px-4 mt-8">
      {ebooks.map((ebook, index) => (
        <div
          key={index}
          className="w-300 p-6 border border-gray-400 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-bold mb-2">
            "{ebook.title}" by {ebook.author}
          </h2>
          <p className="text-sm text-gray-700">{ebook.description}</p>
        </div>
      ))}
    </div>
  );
}
