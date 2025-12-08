import { useState } from "react";
import { motion } from "framer-motion";
import { Send, RotateCcw, Mail, User, MessageSquare, FileText, CheckCircle, XCircle, Loader2, Key, GraduationCap, Globe } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const AboutUs = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Envoi en cours..." });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Message envoyé avec succès !" });
        setFormData({ nom: "", prenom: "", email: "", objet: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Erreur lors de l'envoi du message." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Impossible de se connecter au serveur." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ nom: "", prenom: "", email: "", objet: "", message: "" });
    setStatus({ type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            À propos d'<span className="text-[#4f93d2]">INE Alumni</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Une communauté dynamique d'étudiants et diplômés de l'INPT unis par la
            passion et la solidarité.
          </p>
          <div className="mx-auto mt-6 w-24 h-1 rounded-full bg-[#4f93d2]" />
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#f8fbff] to-[#f0f7ff] rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-full">
                <img
                  src="/assets/besoin.jpeg"
                  alt="Mission"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-semibold text-[#4f93d2] mb-4">
                  Notre Mission
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  INE Alumni est une plateforme collaborative qui renforce les liens
                  entre les générations d'étudiants et diplômés de l'INPT. Elle
                  encourage l'entraide, le partage d'expériences et la création d'un
                  réseau solide pour soutenir l'innovation et la réussite.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Objectifs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#4f93d2] text-center mb-12">
            Nos Objectifs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Key,
                text: "Faciliter l'accès aux opportunités professionnelles (stages, emplois, mentorat).",
              },
              {
                icon: GraduationCap,
                text: "Construire un lien durable entre les étudiants et les Alumni.",
              },
              {
                icon: Globe,
                text: "Promouvoir les événements, les échanges et la collaboration.",
              },
            ].map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#4f93d2] hover:shadow-xl transition-all duration-300"
              >
                <obj.icon className="w-12 h-12 mx-auto mb-4 text-[#4f93d2]" />
                <p className="text-gray-600 text-lg text-center">{obj.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-l from-[#f8fbff] to-[#f0f7ff] rounded-3xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12 order-2 md:order-1">
                <h2 className="text-3xl font-semibold text-[#4f93d2] mb-4">
                  Notre Vision
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Construire un réseau d'excellence basé sur la collaboration et le
                  partage. Grâce à une plateforme interactive, nous souhaitons
                  connecter les talents, partager les opportunités et inspirer les
                  nouvelles générations d'INPTiens.
                </p>
              </div>
              <div className="relative h-64 md:h-full order-1 md:order-2">
                <img
                  src="/assets/besoin.jpeg"
                  alt="Vision"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-[#4f93d2] mb-2 text-center">
              Nous Contacter
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Une question ? Une suggestion ? N'hésitez pas à nous écrire.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <User className="w-4 h-4 text-[#4f93d2]" />
                    Nom<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4f93d2] focus:border-transparent outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <User className="w-4 h-4 text-[#4f93d2]" />
                    Prénom<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4f93d2] focus:border-transparent outline-none transition"
                    placeholder="Votre prénom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 text-[#4f93d2]" />
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4f93d2] focus:border-transparent outline-none transition"
                    placeholder="votre@email.com"
                  />
                </div>

                {/* Objet */}
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                    <FileText className="w-4 h-4 text-[#4f93d2]" />
                    Objet<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="objet"
                    value={formData.objet}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4f93d2] focus:border-transparent outline-none transition"
                    placeholder="Sujet de votre message"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <MessageSquare className="w-4 h-4 text-[#4f93d2]" />
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#4f93d2] focus:border-transparent outline-none transition resize-none"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : status.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {status.type === "success" && <CheckCircle className="w-5 h-5" />}
                  {status.type === "error" && <XCircle className="w-5 h-5" />}
                  {status.type === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span className="font-medium">{status.message}</span>
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-[#4f93d2] text-[#4f93d2] rounded-lg hover:bg-[#e8f2ff] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4f93d2] to-[#5691cb] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Envoi..." : "Envoyer"}
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;