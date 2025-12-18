import React from "react";

const ContactUs = () => {
  return (
    <section className="px-6 py-20 bg-white mx-auto">
      <h2 className="text-2xl font-bold text-center mb-12">Contactez-nous</h2>

      <div className="flex flex-col lg:flex-row items-start gap-12">
        <div className="absolute inset-0 -translate-y-40 ">
          <img
            src="/assets/illustration.png
            "
            alt="illustration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <form className="flex-[2] bg-white grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10 ">
          <input
            type="text"
            placeholder="Nom Complet*"
            className="p-4 border rounded shadow-md w-full"
            required
          />
          <textarea
            placeholder="Message*"
            className="p-4 border rounded shadow-md w-full md:row-span-3"
            rows="6"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Objet*"
            className="p-4 border rounded shadow-md w-full"
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className="p-4 border rounded shadow-md w-full"
            required
          />
          <div className="md:col-span-2 flex justify-center mt-4 ">
            <button
              type="submit"
              className="bg-[#0C5F95] text-white font-semibold py-3 px-30 rounded shadow-md hover:bg-[#053A5F] transition transform transition-transform duration-300 hover:scale-105 focus-within:scale-105cursor-pointer "
            >
              Envoyer le message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
