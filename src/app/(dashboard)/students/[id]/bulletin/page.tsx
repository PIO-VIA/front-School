// src/app/(dashboard)/students/[id]/bulletin/page.tsx (SANS dépendances)
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
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
  EyeOff,
  ArrowLeft,
  Home,
  Copy
} from "lucide-react";
import { getStudents, updateStudent, Student } from "../../components/studentData";

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

// Composant simple pour les graphiques sans dépendances externes
function SimpleBarChart({ data, title }: { data: { nom: string; note: number }[]; title: string }) {
  const maxNote = Math.max(...data.map(d => d.note));
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-xs text-gray-600 truncate">{item.nom}</div>
            <div className="flex-1 mx-2 bg-gray-200 rounded-full h-4 relative">
              <div 
                className={`h-4 rounded-full ${getNiveauNote(item.note).bgColor.replace('bg-', 'bg-gradient-to-r from-')} transition-all duration-500`}
                style={{ width: `${(item.note / 20) * 100}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                {item.note}/20
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleRadialProgress({ value, max, label }: { value: number; max: number; label: string }) {
  const percentage = (value / max) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // rayon de 45
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${getNiveauNote(value).couleur}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{value.toFixed(1)}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BulletinPage() {
  const params = useParams();
  const router = useRouter();
  const bulletinRef = useRef<HTMLDivElement>(null);
  
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [annee, setAnnee] = useState("");
  const [matieres, setMatieres] = useState<{ nom: string; note: number }[]>([]);
  const [newMatiere, setNewMatiere] = useState("");
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const studentId = params.id as string;
    const students = getStudents();
    const foundStudent = students.find(s => s.id === studentId);
    
    if (foundStudent) {
      setStudent(foundStudent);
      setAnnee(foundStudent.bulletin.annee || "2023-2024");
      setMatieres(
        foundStudent.bulletin.matieres.length > 0
          ? foundStudent.bulletin.matieres
          : getDefaultMatieres(foundStudent.section).map((nom) => ({ nom, note: 0 }))
      );
    } else {
      router.push('/students');
    }
  }, [params.id, router]);

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
    if (!student) return;
    updateStudent(student.id, {
      bulletin: {
        annee,
        matieres,
      },
    });
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Recharger les données
    const students = getStudents();
    const updatedStudent = students.find(s => s.id === student.id);
    if (updatedStudent) setStudent(updatedStudent);
  };

  // Export HTML simple
  const generateHTML = () => {
    if (!student || !bulletinRef.current) return;
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bulletin - ${student.prenom} ${student.nom}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: white;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .student-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .notes-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .notes-table th, .notes-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .notes-table th {
            background: #f1f3f4;
            font-weight: bold;
        }
        .mention {
            background: #e8f5e8;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border-left: 5px solid #4caf50;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            color: #666;
        }
        @media print {
            body { margin: 0; padding: 15px; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>BULLETIN DE NOTES</h1>
        <h2>École Primaire Bilingue Excellence</h2>
        <p>Yaoundé, Cameroun</p>
    </div>
    
    <div class="student-info">
        <h2>Informations de l'élève</h2>
        <p><strong>Nom:</strong> ${student.prenom} ${student.nom}</p>
        <p><strong>Classe:</strong> ${student.classe}</p>
        <p><strong>Section:</strong> ${student.section}</p>
        <p><strong>Année scolaire:</strong> ${annee}</p>
    </div>
    
    <h2>Notes par matière</h2>
    <table class="notes-table">
        <thead>
            <tr>
                <th>Matière</th>
                <th>Note</th>
                <th>Niveau</th>
            </tr>
        </thead>
        <tbody>
            ${matieres.map(m => `
                <tr>
                    <td>${m.nom}</td>
                    <td>${m.note}/20</td>
                    <td>${getNiveauNote(m.note).niveau}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="mention">
        <h3>Résultat</h3>
        <p><strong>Moyenne générale:</strong> ${(matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length).toFixed(2)}/20</p>
        <p><strong>Mention:</strong> ${getMention(matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length).mention}</p>
    </div>
    
    <div class="footer">
        <p>École Primaire Bilingue Excellence - Yaoundé, Cameroun</p>
        <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulletin_${student.prenom}_${student.nom}_${annee}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copier les données vers le presse-papiers
  const copyToClipboard = async () => {
    if (!student) return;
    
    const textContent = `
BULLETIN DE NOTES - École Primaire Bilingue Excellence
=====================================================

Élève: ${student.prenom} ${student.nom}
Classe: ${student.classe} - Section ${student.section}
Année: ${annee}
Date: ${new Date().toLocaleDateString('fr-FR')}

NOTES:
------
${matieres.map(m => `${m.nom}: ${m.note}/20 (${getNiveauNote(m.note).niveau})`).join('\n')}

RÉSULTATS:
----------
Moyenne générale: ${(matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length).toFixed(2)}/20
Mention: ${getMention(matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length).mention}

École Primaire Bilingue Excellence - Yaoundé, Cameroun
`;
    
    try {
      await navigator.clipboard.writeText(textContent);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Fonction d'impression simple
  const printBulletin = () => {
    window.print();
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const moyenne = matieres.length > 0
    ? matieres.reduce((acc, m) => acc + m.note, 0) / matieres.length
    : 0;

  const { mention, couleur: couleurMention, icon: MentionIcon } = getMention(moyenne);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification de succès */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Action réussie !
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Accueil
              </motion.button>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDetails(!showDetails)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                {showDetails ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                {showDetails ? 'Masquer' : 'Afficher'} détails
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <Edit3 className="w-5 h-5 mr-2" />
                {isEditing ? 'Annuler' : 'Modifier'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={printBulletin}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <Printer className="w-5 h-5 mr-2" />
                Imprimer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateHTML}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Export HTML
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copier
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles d'impression */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { font-size: 12pt; }
          .bg-gradient-to-r { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
        }
      `}</style>

      {/* Bulletin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={bulletinRef} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
            <div className="relative p-8">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-2">BULLETIN DE NOTES</h1>
                <p className="text-xl text-indigo-100">École Primaire Bilingue Excellence</p>
                <p className="text-indigo-200">Yaoundé, Cameroun</p>
              </div>
              
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                    <span className="text-3xl font-bold">{student.nom.charAt(0)}{student.prenom.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{student.prenom} {student.nom}</h2>
                    <p className="text-indigo-200">Classe {student.classe} - Section {student.section}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Bar */}
            <div className="bg-black/20 backdrop-blur-sm px-8 py-4">
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
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Dashboard Overview */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print"
                >
                  {/* Performance Générale */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Performance Générale
                    </h3>
                    <div className="flex justify-center">
                      <SimpleRadialProgress value={moyenne} max={20} label="/20" />
                    </div>
                    <div className="text-center mt-4">
                      <div className={`text-sm font-medium ${getNiveauNote(moyenne).couleur}`}>
                        {getNiveauNote(moyenne).niveau}
                      </div>
                    </div>
                  </div>

                  {/* Graphique des notes */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6">
                    <SimpleBarChart data={matieres.slice(0, 5)} title="Top 5 Matières" />
                  </div>

                  {/* Mention & Achievement */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notes Section */}
            <div>
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
                {matieres.map((matiere, idx) => {
                  const { niveau, couleur, icon: Icon, bgColor } = getNiveauNote(matiere.note);
                  
                  return (
                    <div
                      key={`${matiere.nom}-${idx}`}
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
                            <div className="flex items-center space-x-3 no-print">
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
                              <button
                                className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                onClick={() => handleDelete(idx)}
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              matiere.note >= 16 ? 'bg-green-500' :
                              matiere.note >= 14 ? 'bg-blue-500' :
                              matiere.note >= 12 ? 'bg-purple-500' :
                              matiere.note >= 10 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
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
                <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300 no-print">
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
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
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
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune note enregistrée</h3>
                  <p className="text-gray-500">Commencez par ajouter des notes pour ce bulletin.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex justify-end gap-4 pt-8 border-t no-print">
                <button
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center"
                  onClick={handleSave}
                >
                  <Save className="w-5 h-5 mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
            )}

            {/* School Footer */}
            <div className="text-center pt-8 border-t text-gray-500 text-sm">
              <p>École Primaire Bilingue Excellence - Yaoundé, Cameroun</p>
              <p>Généré le {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}