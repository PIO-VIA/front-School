"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  FileText, 
  Award, 
  Calendar, 
  User, 
  School, 
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  Save,
  Plus,
  Trash2,
  Target,
  BarChart3,
  PieChart,
  Star,
  Medal,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit3,
  Printer,
  Share,
  Eye,
  EyeOff
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Student, updateStudent, Bulletin } from "./studentData";

const MATIERES_CM = [
  "Mathématiques",
  "Français", 
  "Anglais",
  "Éducation Civique",
  "Sciences d'Observation",
  "Histoire-Géographie",
  "Éducation Physique",
  "Arts Plastiques",
  "Musique"
];

const MATIERES_CLASS = [
  "Mathematics",
  "English Language",
  "Science",
  "Social Studies", 
  "Civic Education",
  "Physical Education",
  "Arts",
  "Music"
];

const COLORS = {
  excellent: '#10B981',    // Green
  tresBien: '#3B82F6',     // Blue  
  bien: '#8B5CF6',         // Purple
  assezBien: '#F59E0B',    // Orange
  insuffisant: '#EF4444'   // Red
};

const PIE_COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

function getDefaultMatieres(section: string) {
  return section === "Francophone" ? MATIERES_CM : MATIERES_CLASS;
}

function getNiveauNote(note: number): { niveau: string; couleur: string; icon: any; bgColor: string } {
  if (note >= 16) return { 
    niveau: "Excellent", 
    couleur: "text-green-600", 
    icon: TrendingUp, 
    bgColor: "bg-green-100" 
  };
  if (note >= 14) return { 
    niveau: "Très Bien", 
    couleur: "text-blue-600", 
    icon: TrendingUp, 
    bgColor: "bg-blue-100" 
  };
  if (note >= 12) return { 
    niveau: "Bien", 
    couleur: "text-purple-600", 
    icon: Minus, 
    bgColor: "bg-purple-100" 
  };
  if (note >= 10) return { 
    niveau: "Assez Bien", 
    couleur: "text-orange-600", 
    icon: Minus, 
    bgColor: "bg-orange-100" 
  };
  return { 
    niveau: "Insuffisant", 
    couleur: "text-red-600", 
    icon: TrendingDown, 
    bgColor: "bg-red-100" 
  };
}

function getMention(moyenne: number): { mention: string; couleur: string; icon: any } {
  if (moyenne >= 16) return { mention: "Félicitations", couleur: "text-green-600", icon: Medal };
  if (moyenne >= 14) return { mention: "Compliments", couleur: "text-blue-600", icon: Award };
  if (moyenne >= 12) return { mention: "Encouragements", couleur: "text-purple-600", icon: Star };
  if (moyenne >= 10) return { mention: "Travail satisfaisant", couleur: "text-orange-600", icon: Target };
  return { mention: "Doit faire des efforts", couleur: "text-red-600", icon: AlertCircle };
}

export default function StudentBulletin({
  student,
  onClose,
  onSaved,
}: {
  student: Student;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [annee, setAnnee] = useState(student.bulletin.annee || "2023-2024");
  const [matieres, setMatieres] = useState(
    student.bulletin.matieres.length > 0
      ? student.bulletin.matieres
      : getDefaultMatieres(student.section).map((nom) => ({ nom, note: 0 }))
  );
  const [newMatiere, setNewMatiere] = useState("");
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const handleNoteChange = (idx: number, value: string) => {
    const note = parseFloat(value);
    if (isNaN(note) || note < 0 || note > 20) return;
    setMatieres((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, note } : m))
    );
  };

  const handleDelete = (idx: number) => {
    setMatieres((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newMatiere || newNote === "") {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    const note = parseFloat(newNote);
    if (isNaN(note) || note < 0 || note > 20) {
      setError("Note invalide (0 à 20)");
      return;
    }
    if (matieres.some((m) => m.nom.toLowerCase() === newMatiere.toLowerCase())) {
      setError("Matière déjà présente");
      return;
    }
    setMatieres((prev) => [...prev, { nom: newMatiere, note }]);
    setNewMatiere("");
    setNewNote("");
  };

  const handleSave = () => {
    updateStudent(student.id, {
      bulletin: {
        annee,
        matieres,
      },
    });
    onSaved();
    setIsEditing(false);
  };

  const moyenne = matieres.length > 0
    ? matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length
    : 0;

  const { mention, couleur: couleurMention, icon: MentionIcon } = getMention(moyenne);

  // Prepare data for charts
  const chartData = matieres.map(m => ({
    ...m,
    fill: getNiveauNote(m.note).couleur.replace('text-', '#')
  }));

  const radialData = [
    {
      name: 'Moyenne',
      value: moyenne,
      fill: getNiveauNote(moyenne).couleur.replace('text-', '')
    }
  ];

  const repartitionNotes = matieres.reduce((acc, m) => {
    const niveau = getNiveauNote(m.note).niveau;
    acc[niveau] = (acc[niveau] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(repartitionNotes).map(([niveau, count], index) => ({
    name: niveau,
    value: count,
    fill: PIE_COLORS[index % PIE_COLORS.length]
  }));

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bulletinText = `
BULLETIN SCOLAIRE - ÉCOLE PRIMAIRE BILINGUE EXCELLENCE
════════════════════════════════════════════════════════
Yaoundé, Cameroun

INFORMATIONS ÉLÈVE
──────────────────
Nom: ${student.prenom} ${student.nom}
Classe: ${student.classe} - Section ${student.section}
Année scolaire: ${annee}
Date d'édition: ${new Date().toLocaleDateString('fr-FR')}

RÉSULTATS SCOLAIRES
───────────────────
${matieres.map(m => `${m.nom.padEnd(25)} : ${m.note.toString().padStart(5)}/20 (${getNiveauNote(m.note).niveau})`).join('\n')}

SYNTHÈSE
────────
Nombre de matières: ${matieres.length}
Moyenne générale: ${moyenne.toFixed(2)}/20
Mention: ${mention}

OBSERVATIONS
────────────
${moyenne >= 16 ? 'Excellents résultats, continuez ainsi !' : 
  moyenne >= 14 ? 'Très bons résultats, félicitations !' :
  moyenne >= 12 ? 'Bons résultats, maintenez vos efforts !' :
  moyenne >= 10 ? 'Résultats satisfaisants, vous pouvez mieux faire !' :
  'Des efforts supplémentaires sont nécessaires.'}

═══════════════════════════════════════════════════════════
École Primaire Bilingue Excellence - www.excellence-school.cm
      `;
      
      const blob = new Blob([bulletinText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulletin_${student.prenom}_${student.nom}_${annee}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
    
    setIsGeneratingPDF(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-2xl overflow-hidden">
        <div className="relative p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-6"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Bulletin de Notes</h1>
                <p className="text-lg text-indigo-100">{student.prenom} {student.nom}</p>
                <p className="text-indigo-200">Classe {student.classe} - Section {student.section}</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDetails(!showDetails)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                {showDetails ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                {showDetails ? 'Masquer' : 'Afficher'} détails
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                {isEditing ? 'Annuler' : 'Modifier'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Download className="w-5 h-5 mr-2" />
                )}
                Export PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Student Info Bar */}
        <motion.div 
          variants={itemVariants}
          className="bg-black/20 backdrop-blur-sm px-8 py-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">{matieres.length}</div>
              <div className="text-sm text-indigo-200">Matières</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{moyenne.toFixed(2)}</div>
              <div className="text-sm text-indigo-200">Moyenne</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{annee}</div>
              <div className="text-sm text-indigo-200">Année scolaire</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{mention}</div>
              <div className="text-sm text-indigo-200">Mention</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Dashboard Overview */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Moyenne Radial Chart */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Performance Générale
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[{value: (moyenne/20)*100}]}>
                        <RadialBar
                          dataKey="value"
                          cornerRadius={10}
                          fill={getNiveauNote(moyenne).couleur.replace('text-', '#')}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{moyenne.toFixed(2)}/20</div>
                    <div className={`text-sm font-medium ${getNiveauNote(moyenne).couleur}`}>
                      {getNiveauNote(moyenne).niveau}
                    </div>
                  </div>
                </motion.div>

                {/* Notes Distribution */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-green-600" />
                    Répartition des Notes
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip />
                        <RechartsPieChart data={pieData}>
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Mention & Achievement */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Mention Obtenue
                  </h3>
                  <div className="text-center space-y-4">
                    <div className={`w-20 h-20 ${getNiveauNote(moyenne).bgColor} rounded-full flex items-center justify-center mx-auto`}>
                      <MentionIcon className={`w-10 h-10 ${couleurMention}`} />
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${couleurMention}`}>{mention}</div>
                      <div className="text-sm text-gray-600 mt-2">
                        {moyenne >= 16 ? 'Travail exemplaire !' : 
                         moyenne >= 14 ? 'Très bon travail !' :
                         moyenne >= 12 ? 'Bon niveau maintenu !' :
                         moyenne >= 10 ? 'Peut encore progresser' :
                         'Efforts nécessaires'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
                Notes par Matière
              </h3>
              {!isEditing && matieres.length > 0 && (
                <div className="text-sm text-gray-500">
                  Moyenne: <span className="font-semibold text-lg">{moyenne.toFixed(2)}/20</span>
                </div>
              )}
            </div>

            {/* Notes Table/Cards */}
            <div className="space-y-4">
              <AnimatePresence>
                {matieres.map((matiere, idx) => {
                  const { niveau, couleur, icon: Icon, bgColor } = getNiveauNote(matiere.note);
                  
                  return (
                    <motion.div
                      key={`${matiere.nom}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 ${couleur}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">{matiere.nom}</h4>
                            <div className={`text-sm font-medium ${couleur}`}>{niveau}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {isEditing ? (
                            <div className="flex items-center space-x-3">
                              <input
                                type="number"
                                min={0}
                                max={20}
                                step={0.5}
                                value={matiere.note}
                                onChange={(e) => handleNoteChange(idx, e.target.value)}
                                className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              />
                              <span className="text-gray-500">/20</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                onClick={() => handleDelete(idx)}
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="text-3xl font-bold text-gray-800">{matiere.note}</div>
                              <div className="text-sm text-gray-500">/20</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className={`h-2 rounded-full ${getNiveauNote(matiere.note).couleur.replace('text-', 'bg-')}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(matiere.note / 20) * 100}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Add Subject Form */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300"
                >
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Ajouter une matière
                  </h4>
                  <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-48">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Matière
                      </label>
                      <input
                        value={newMatiere}
                        onChange={(e) => setNewMatiere(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nom de la matière"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        step={0.5}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0-20"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </motion.button>
                  </form>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm mt-2 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {error}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {matieres.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-50 rounded-xl"
              >
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune note enregistrée</h3>
                <p className="text-gray-500">Commencez par ajouter des notes pour ce bulletin.</p>
              </motion.div>
            )}
          </motion.div>

          {/* Actions */}
          {isEditing && (
            <motion.div 
              variants={itemVariants}
              className="flex justify-end gap-4 pt-8 border-t"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center"
                onClick={handleSave}
              >
                <Save className="w-5 h-5 mr-2" />
                Enregistrer les modifications
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}