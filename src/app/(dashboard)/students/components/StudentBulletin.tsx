"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  Trash2
} from "lucide-react";
import { Student, updateStudent, Bulletin } from "./studentData";

// Import jsPDF - in a real app you'd install this dependency
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

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

function getNiveauNote(note: number): { niveau: string; couleur: string; icon: any } {
  if (note >= 16) return { niveau: "Excellent", couleur: "text-green-600", icon: TrendingUp };
  if (note >= 14) return { niveau: "Très Bien", couleur: "text-blue-600", icon: TrendingUp };
  if (note >= 12) return { niveau: "Bien", couleur: "text-indigo-600", icon: Minus };
  if (note >= 10) return { niveau: "Assez Bien", couleur: "text-yellow-600", icon: Minus };
  return { niveau: "Insuffisant", couleur: "text-red-600", icon: TrendingDown };
}

function getMention(moyenne: number): { mention: string; couleur: string } {
  if (moyenne >= 16) return { mention: "Félicitations", couleur: "text-green-600" };
  if (moyenne >= 14) return { mention: "Compliments", couleur: "text-blue-600" };
  if (moyenne >= 12) return { mention: "Encouragements", couleur: "text-indigo-600" };
  if (moyenne >= 10) return { mention: "Travail satisfaisant", couleur: "text-yellow-600" };
  return { mention: "Doit faire des efforts", couleur: "text-red-600" };
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
    onClose();
  };

  const moyenne = matieres.length > 0
    ? matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length
    : 0;

  const { mention, couleur: couleurMention } = getMention(moyenne);

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    // Simulation of PDF generation
    // In a real app, you would use jsPDF and html2canvas
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple text-based bulletin for download
      const bulletinText = `
BULLETIN SCOLAIRE
École Primaire Bilingue Excellence
Yaoundé, Cameroun

Élève: ${student.prenom} ${student.nom}
Classe: ${student.classe} - Section ${student.section}
Année scolaire: ${annee}

NOTES:
${matieres.map(m => `${m.nom}: ${m.note}/20 (${getNiveauNote(m.note).niveau})`).join('\n')}

MOYENNE GÉNÉRALE: ${moyenne.toFixed(2)}/20
MENTION: ${mention}

Date d'édition: ${new Date().toLocaleDateString('fr-FR')}
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bulletin de Notes</h2>
              <p className="text-indigo-100">{student.prenom} {student.nom}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors flex items-center disabled:opacity-50"
            >
              {isGeneratingPDF ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Export PDF
            </motion.button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 space-y-6">
        {/* Student Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Élève</p>
                <p className="font-semibold">{student.prenom} {student.nom}</p>
              </div>
            </div>
            <div className="flex items-center">
              <School className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Classe</p>
                <p className="font-semibold">{student.classe} - {student.section}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Année scolaire</p>
                <input
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                  className="font-semibold bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Notes par matière</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Matière</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Note /20</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Appréciation</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matieres.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-8">
                      Aucune matière ajoutée
                    </td>
                  </tr>
                )}
                {matieres.map((m, idx) => {
                  const { niveau, couleur, icon: Icon } = getNiveauNote(m.note);
                  return (
                    <motion.tr 
                      key={m.nom}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{m.nom}</td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="number"
                          min={0}
                          max={20}
                          step={0.5}
                          value={m.note}
                          onChange={(e) => handleNoteChange(idx, e.target.value)}
                          className="w-20 text-center border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className={`flex items-center justify-center ${couleur}`}>
                          <Icon className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{niveau}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors"
                          onClick={() => handleDelete(idx)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Subject Form */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Ajouter une matière</h4>
          <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-48">
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </motion.button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>

        {/* Summary */}
        {matieres.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-indigo-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">Résultats</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Nombre de matières</p>
                  <p className="text-2xl font-bold text-gray-900">{matieres.length}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Moyenne générale</p>
                  <p className="text-3xl font-bold text-indigo-600">{moyenne.toFixed(2)}/20</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Mention</p>
                  <p className={`text-xl font-bold ${couleurMention}`}>{mention}</p>
                </div>
              </div>

              <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(moyenne / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            Annuler
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </motion.button>
        </div>
      </div>
    </div>
  );
}