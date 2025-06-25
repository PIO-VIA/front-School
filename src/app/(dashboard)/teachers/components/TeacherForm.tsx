"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Users, 
  Save, 
  X, 
  AlertCircle,
  GraduationCap,
  CheckCircle,
  Award,
  Briefcase,
  UserCheck
} from "lucide-react";
import { Teacher, addTeacher, updateTeacher } from "./teacherData";

const MATIERES_OPTIONS = [
  "Mathématiques", "Français", "Anglais", "Sciences d'Observation",
  "Histoire-Géographie", "Éducation Civique", "Arts Plastiques",
  "Musique", "Éducation Physique", "Informatique",
  "English Language", "Mathematics", "Science", "Social Studies"
];

export default function TeacherForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Teacher | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    nom: initial?.nom || "",
    prenom: initial?.prenom || "",
    sexe: initial?.sexe || "M",
    dateNaissance: initial?.dateNaissance || "",
    telephone: initial?.telephone || "",
    email: initial?.email || "",
    adresse: initial?.adresse || "",
    matieres: initial?.matieres || [],
    selectedMatieres: initial?.matieres.join(", ") || "",
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
      title: "Contact & Localisation",
      icon: Phone,
      fields: ["telephone", "email", "adresse"]
    },
    {
      id: 3,
      title: "Informations professionnelles",
      icon: BookOpen,
      fields: ["matieres"]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'matieres') {
        setForm(prev => ({
          ...prev,
          matieres: checked 
            ? [...prev.matieres, value]
            : prev.matieres.filter(m => m !== value)
        }));
      }
    } else if (name === 'selectedMatieres') {
      const matieresArray = value.split(',').map(m => m.trim()).filter(m => m.length > 0);
      setForm(prev => ({ 
        ...prev, 
        selectedMatieres: value,
        matieres: matieresArray
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const validateStep = (step: number) => {
    const stepFields = steps[step - 1].fields;
    const requiredFields = ["nom", "prenom", "dateNaissance", "matieres"];
    
    for (const field of stepFields) {
      if (requiredFields.includes(field)) {
        if (field === "matieres" && form.matieres.length === 0) {
          setError("Veuillez sélectionner au moins une matière.");
          return false;
        } else if (field !== "matieres" && !form[field as keyof typeof form]) {
          setError(`Le champ ${field} est obligatoire.`);
          return false;
        }
      }
    }

    if (stepFields.includes("telephone") && form.telephone && !/^6[0-9]{8}$/.test(form.telephone)) {
      setError("Numéro de téléphone invalide (ex: 690123456)");
      return false;
    }

    if (stepFields.includes("email") && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Adresse email invalide");
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
      const teacherData = {
        ...form,
        email: form.email || `${form.prenom.toLowerCase()}.${form.nom.toLowerCase()}@excellence-school.cm`,
        lieuNaissance: "Yaoundé, Cameroun",
        photo: `https://images.unsplash.com/photo-${form.sexe === 'M' ? '1472099645785-5658abf4ff4e' : '1580489944761-15a19d654956'}?w=150&h=150&fit=crop&crop=face`,
        numeroIdentite: Math.floor(Math.random() * 900000000 + 100000000).toString(),
        classes: [],
        section: form.matieres.some(m => m.includes('English') || m.includes('Mathematics')) ? 'Anglophone' : 'Francophone',
        diplomes: [
          {
            titre: 'Licence',
            institution: 'Université de Yaoundé',
            annee: 2010
          }
        ],
        experience: [
          {
            poste: 'Enseignant',
            etablissement: 'École Primaire Bilingue Excellence',
            debut: new Date().getFullYear() + '-09-01',
            description: `Enseignement de ${form.matieres.join(' et ')}`
          }
        ],
        salaire: {
          base: 150000,
          primes: [],
          total: 150000
        },
        contrat: {
          type: 'CDI' as const,
          debut: new Date().getFullYear() + '-09-01',
          heuresParSemaine: 20
        },
        evaluation: {
          competencePedagogique: 4,
          relationEleves: 4,
          ponctualite: 4,
          innovation: 4,
          travailEquipe: 4,
          commentaires: 'Nouvel enseignant',
          dateDerniereEvaluation: new Date().toISOString().split('T')[0]
        },
        formation: [],
        responsabilites: ['Enseignement'],
        historiquePresence: [],
        congesRestants: 30,
        statut: 'actif' as const,
        urgence: {
          nom: `${form.nom} Urgence`,
          telephone: form.telephone,
          relation: 'Famille'
        },
        dateEmbauche: new Date().toISOString().split('T')[0]
      };

      if (initial) {
        updateTeacher(initial.id, { ...form, matieres: form.matieres });
      } else {
        addTeacher({
          id: Date.now().toString(),
          ...teacherData,
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
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
                  {initial ? "Modifier l'enseignant" : "Nouvel enseignant"}
                </h2>
                <p className="text-emerald-100">{steps[currentStep - 1].title}</p>
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
                      ? 'bg-white text-emerald-600' 
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
            <div className="text-sm text-emerald-100">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-5 h-5 text-emerald-600 mr-2" />
                      <h4 className="font-medium text-emerald-900">Information</h4>
                    </div>
                    <p className="text-sm text-emerald-700">
                      Ces informations sont nécessaires pour créer le profil de l'enseignant dans notre système.
                    </p>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Téléphone
                      </label>
                      <input
                        name="telephone"
                        value={form.telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="690123456"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: 6XXXXXXXX</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="enseignant@excellence.cm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresse
                    </label>
                    <textarea
                      name="adresse"
                      value={form.adresse}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Adresse complète..."
                    />
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center mb-2">
                      <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-medium text-blue-900">Contact professionnel</h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Ces informations permettront à l'administration et aux parents de contacter l'enseignant.
                    </p>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Matières enseignées *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {MATIERES_OPTIONS.map((matiere) => (
                        <label key={matiere} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            name="matieres"
                            value={matiere}
                            checked={form.matieres.includes(matiere)}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{matiere}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ou saisir manuellement (séparées par des virgules)
                      </label>
                      <textarea
                        name="selectedMatieres"
                        value={form.selectedMatieres}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Ex: Mathématiques, Français, Sciences"
                      />
                    </div>
                  </div>

                  {form.matieres.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-green-900">Matières sélectionnées</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.matieres.map((matiere, index) => (
                          <span key={index} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                            {matiere}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">Récapitulatif</h4>
                    <div className="space-y-1 text-sm text-purple-700">
                      <p><strong>Nom:</strong> {form.prenom} {form.nom}</p>
                      <p><strong>Contact:</strong> {form.telephone} • {form.email}</p>
                      <p><strong>Matières:</strong> {form.matieres.join(", ") || "Aucune sélectionnée"}</p>
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
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
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
                      {initial ? "Enregistrer" : "Ajouter l'enseignant"}
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