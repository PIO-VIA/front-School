"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  School, 
  Users, 
  Save, 
  X, 
  AlertCircle,
  UserPlus,
  Camera,
  CheckCircle
} from "lucide-react";
import { Student, addStudent, updateStudent } from "./studentData";

const SECTIONS = ["Francophone", "Anglophone"];
const CLASSES = [
  "CP", "CE1", "CE2", "CM1", "CM2", // francophone
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6" // anglophone
];

export default function StudentForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Student | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    nom: initial?.nom || "",
    prenom: initial?.prenom || "",
    sexe: initial?.sexe || "M",
    dateNaissance: initial?.dateNaissance || "",
    section: initial?.section || SECTIONS[0],
    classe: initial?.classe || "",
    adresse: initial?.adresse || "",
    telephone: initial?.telephone || "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Informations personnelles",
      icon: User,
      fields: ["nom", "prenom", "sexe", "dateNaissance"]
    },
    {
      id: 2,
      title: "Informations scolaires",
      icon: School,
      fields: ["section", "classe"]
    },
    {
      id: 3,
      title: "Contact",
      icon: Phone,
      fields: ["adresse", "telephone"]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateStep = (step: number) => {
    const stepFields = steps[step - 1].fields;
    const requiredFields = ["nom", "prenom", "dateNaissance", "classe"];
    
    for (const field of stepFields) {
      if (requiredFields.includes(field) && !form[field as keyof typeof form]) {
        setError(`Le champ ${field} est obligatoire.`);
        return false;
      }
    }

    if (stepFields.includes("telephone") && form.telephone && !/^6[0-9]{8}$/.test(form.telephone)) {
      setError("Numéro de téléphone invalide (ex: 690123456)");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      setError("");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateStep(currentStep)) {
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (initial) {
        updateStudent(initial.id, form);
      } else {
        addStudent({
          id: Date.now().toString(),
          ...form,
          lieuNaissance: "Yaoundé, Cameroun",
          email: "",
          photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
          tuteur: {
            nom: form.nom,
            prenom: "Tuteur",
            telephone: form.telephone,
            email: "",
            profession: "",
            adresse: form.adresse,
            relation: "Parent"
          },
          urgence: {
            nom: `${form.nom} Urgence`,
            telephone: form.telephone,
            relation: "Parent"
          },
          medical: {
            allergies: [],
            medicaments: [],
            problemesSante: []
          },
          historiquePresence: [],
          bulletin: { 
            annee: "2023-2024", 
            trimestre: 1,
            matieres: [],
            moyenneGenerale: 0,
            rang: 0,
            effectif: 0,
            appreciation: "",
            mention: ""
          },
          comportement: {
            discipline: 4,
            participation: 4,
            travailEquipe: 4,
            ponctualite: 4
          },
          activitesExtrascolaires: [],
          dateInscription: new Date().toISOString().split('T')[0],
          statut: 'actif'
        });
      }
      onSaved();
      onClose();
    } catch (error) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setIsLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getCurrentStepIcon = () => {
    const StepIcon = steps[currentStep - 1].icon;
    return <StepIcon className="w-6 h-6" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {getCurrentStepIcon()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {initial ? "Modifier l'élève" : "Nouvel élève"}
                </h2>
                <p className="text-indigo-100">{steps[currentStep - 1].title}</p>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <motion.div variants={itemVariants} className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep >= step.id 
                      ? 'bg-white text-indigo-600' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 rounded transition-all ${
                      currentStep > step.id ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-indigo-100">
              Étape {currentStep} sur {steps.length}
            </div>
          </motion.div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom *
                      </label>
                      <input
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nom de famille"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Prénom *
                      </label>
                      <input
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder="Prénom"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Sexe
                      </label>
                      <select
                        name="sexe"
                        value={form.sexe}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date de naissance *
                      </label>
                      <input
                        name="dateNaissance"
                        type="date"
                        value={form.dateNaissance}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <School className="w-4 h-4 inline mr-2" />
                        Section
                      </label>
                      <select
                        name="section"
                        value={form.section}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      >
                        {SECTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <School className="w-4 h-4 inline mr-2" />
                        Classe *
                      </label>
                      <select
                        name="classe"
                        value={form.classe}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        <option value="">Choisir une classe</option>
                        {CLASSES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Information sur la section</h4>
                    <p className="text-sm text-blue-700">
                      {form.section === "Francophone" 
                        ? "Enseignement principalement en français selon le système éducatif camerounais"
                        : "Enseignement en anglais selon le système éducatif anglo-saxon"
                      }
                    </p>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresse
                    </label>
                    <input
                      name="adresse"
                      value={form.adresse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Adresse complète"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone
                    </label>
                    <input
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="690123456"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 6XXXXXXXX</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Récapitulatif</h4>
                    <div className="space-y-1 text-sm text-green-700">
                      <p><strong>Nom:</strong> {form.prenom} {form.nom}</p>
                      <p><strong>Classe:</strong> {form.classe} - {form.section}</p>
                      <p><strong>Date de naissance:</strong> {form.dateNaissance}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Précédent
                </motion.button>
              )}
            </div>

            <div>
              {currentStep < steps.length ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Suivant
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {initial ? "Enregistrer" : "Ajouter l'élève"}
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}