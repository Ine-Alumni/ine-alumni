import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("✅ Message envoyé avec succès !");
        setFormData({ nom: "", prenom: "", email: "", objet: "", message: "" });
      } else {
        setStatus("❌ Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className="mx-[10vw] max-lg:mx-[4vw] mt-30 font-sans text-gray-800">
      {/* --- Hero Section --- */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#4f93d2] to-[#5691cb] text-transparent bg-clip-text">
          À propos d’INE Alumni
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Une communauté dynamique d’étudiants et diplômés de l’INPT unis par la
          passion et la solidarité.
        </p>
        <div className="mx-auto mt-6 w-24 h-1 rounded-full bg-[#4f93d2]" />
      </motion.div>

      {/* --- Mission Section --- */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-gradient-to-r from-[#f8fbff] to-[#f0f7ff] p-10 rounded-3xl shadow-sm">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          src="/assets/besoin.jpeg"
          alt="Mission"
          className="w-full md:w-1/2 rounded-2xl shadow-md object-cover h-64"
        />
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-[#4f93d2] mb-4">
            Notre mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            INE Alumni est une plateforme collaborative qui renforce les liens
            entre les générations d’étudiants et diplômés de l’INPT. Elle
            encourage l’entraide, le partage d’expériences et la création d’un
            réseau solide pour soutenir l’innovation et la réussite.
          </p>
        </div>
      </section>

      {/* --- Objectifs --- */}
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-bold text-[#4f93d2] mb-12">
          Nos Objectifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "/assets/icons/key.svg",
              text: "Faciliter l’accès aux opportunités professionnelles (stages, emplois, mentorat).",
            },
            {
              icon: "/assets/icons/Mortarboard.svg",
              text: "Construire un lien durable entre les étudiants et les Alumni.",
            },
            {
              icon: "/assets/icons/world.svg",
              text: "Promouvoir les événements, les échanges et la collaboration.",
            },
          ].map((obj, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#4f93d2] hover:shadow-xl transition-all duration-300"
            >
              <img
                src={obj.icon}
                alt=""
                className="w-12 h-12 mx-auto mb-4 opacity-90"
              />
              <p className="text-gray-600 text-lg">{obj.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Vision --- */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-gradient-to-l from-[#f8fbff] to-[#f0f7ff] p-10 rounded-3xl shadow-sm">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-[#4f93d2] mb-4">
            Notre vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Construire un réseau d’excellence basé sur la collaboration et le
            partage. Grâce à une plateforme interactive, nous souhaitons
            connecter les talents, partager les opportunités et inspirer les
            nouvelles générations d’INPTiens.
          </p>
        </div>
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          src="/assets/besoin.jpeg"
          alt="Vision"
          className="w-full md:w-1/2 rounded-2xl shadow-md object-cover h-64"
        />
      </section>

      {/* --- Contact --- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-lg p-10 mb-20 border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-[#4f93d2] mb-8 text-center">
          Nous Contacter
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["nom", "prenom", "email", "objet"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium capitalize mb-2">
                  {field}*
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#4f93d2] outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message*
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#4f93d2] outline-none"
              placeholder="Écrivez votre message ici..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  nom: "",
                  prenom: "",
                  email: "",
                  objet: "",
                  message: "",
                })
              }
              className="px-5 py-2 border border-[#4f93d2] text-[#4f93d2] rounded-lg hover:bg-[#e8f2ff] transition"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#4f93d2] to-[#5691cb] text-white rounded-lg hover:opacity-90 transition"
            >
              Envoyer
            </button>
          </div>
        </form>

        {status && (
          <p className="mt-6 text-center text-gray-700 font-medium">{status}</p>
        )}
      </motion.section>
    </div>
  );
};

export default AboutUs;
