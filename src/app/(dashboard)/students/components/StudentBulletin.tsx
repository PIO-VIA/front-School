// src/app/(dashboard)/students/components/StudentBulletin.tsx (version simplifiée)
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  Award, 
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
  Star,
  Medal,
  BookOpen,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Student, updateStudent } from "./studentData";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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

  const handleViewFullBulletin = () => {
    onClose();
    router.push(`/students/${student.id}/bulletin`);
  };

  const moyenne = matieres.length > 0
    ? matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length
    : 0;

  const { mention, couleur: couleurMention, icon: MentionIcon } = getMention(moyenne);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-2xl overflow-hidden">
        <div className="relative p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Bulletin de Notes</h1>
                <p className="text-lg text-indigo-100">{student.prenom} {student.nom}</p>
                <p className="text-indigo-200">Classe {student.classe} - Section {student.section}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewFullBulletin}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Voir en plein écran
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-black/20 backdrop-blur-sm px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">{matieres.length}</div>
              <div className="text-xs text-indigo-200">Matières</div>
            </div>
            <div>
              <div className="text-xl font-bold">{moyenne.toFixed(2)}</div>
              <div className="text-xs text-indigo-200">Moyenne</div>
            </div>
            <div>
              <div className="text-xl font-bold">{annee}</div>
              <div className="text-xs text-indigo-200">Année</div>
            </div>
            <div>
              <div className="text-xl font-bold">{mention}</div>
              <div className="text-xs text-indigo-200">Mention</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Notes Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Notes par Matière
              </h3>
              {!isEditing && matieres.length > 0 && (
                <div className="text-sm text-gray-500">
                  Moyenne: <span className="font-semibold text-lg">{moyenne.toFixed(2)}/20</span>
                </div>
              )}
            </div>

            {/* Notes Table/Cards */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {matieres.map((matiere, idx) => {
                const { niveau, couleur, icon: Icon, bgColor } = getNiveauNote(matiere.note);
                
                return (
                  <div
                    key={`${matiere.nom}-${idx}`}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${couleur}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{matiere.nom}</h4>
                          <div className={`text-xs font-medium ${couleur}`}>{niveau}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {isEditing ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min={0}
                              max={20}
                              step={0.5}
                              value={matiere.note}
                              onChange={(e) => handleNoteChange(idx, e.target.value)}
                              className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <span className="text-gray-500 text-sm">/20</span>
                            <button
                              className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors"
                              onClick={() => handleDelete(idx)}
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{matiere.note}</div>
                            <div className="text-xs text-gray-500">/20</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${getNiveauNote(matiere.note).couleur.replace('text-', 'bg-')}`}
                          style={{ width: `${(matiere.note / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Subject Form */}
            {isEditing && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une matière
                </h4>
                <form onSubmit={handleAdd} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Matière
                    </label>
                    <input
                      value={newMatiere}
                      onChange={(e) => setNewMatiere(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Nom de la matière"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={20}
                      step={0.5}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="0-20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </button>
                </form>
                {error && (
                  <div className="text-red-600 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>
            )}

            {matieres.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune note enregistrée</h3>
                <p className="text-gray-500">Commencez par ajouter des notes pour ce bulletin.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}