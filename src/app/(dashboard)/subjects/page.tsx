"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Clock, 
  Award, 
  Edit, 
  Trash2, 
  X,
  Save,
  AlertCircle,
  Users,
  Target,
  BookMarked
} from "lucide-react";

export type Subject = {
  id: string;
  nom: string;
  code: string;
  description: string;
  coefficient: number;
  heuresParSemaine: number;
  section: string;
  classes: string[];
  enseignants: string[];
  couleur: string;
};

// Données simulées camerounaises
const INITIAL_SUBJECTS: Subject[] = [
  {
    id: '1',
    nom: 'Mathématiques',
    code: 'MATH',
    description: 'Calcul, géométrie, problèmes et raisonnement logique',
    coefficient: 4,
    heuresParSemaine: 6,
    section: 'Francophone',
    classes: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    enseignants: ['M. Essomba Jean-Pierre', 'Mme Foning Clarisse'],
    couleur: '#3B82F6'
  },
  {
    id: '2',
    nom: 'Français',
    code: 'FR',
    description: 'Lecture, écriture, grammaire, conjugaison et vocabulaire',
    coefficient: 4,
    heuresParSemaine: 8,
    section: 'Francophone',
    classes: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    enseignants: ['Mme Ngono Célestine', 'Mme Bomda Victoire'],
    couleur: '#EF4444'
  },
  {
    id: '3',
    nom: 'Anglais',
    code: 'EN',
    description: 'Langue anglaise - expression orale et écrite',
    coefficient: 2,
    heuresParSemaine: 3,
    section: 'Francophone',
    classes: ['CE1', 'CE2', 'CM1', 'CM2'],
    enseignants: ['Mrs. Tabi Grace', 'Mr. Njong Martin'],
    couleur: '#10B981'
  },
  {
    id: '4',
    nom: 'Sciences d\'Observation',
    code: 'SCI',
    description: 'Découverte du monde, sciences naturelles et environnement',
    coefficient: 2,
    heuresParSemaine: 3,
    section: 'Francophone',
    classes: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    enseignants: ['M. Takougang Paul'],
    couleur: '#8B5CF6'
  },
  {
    id: '5',
    nom: 'Histoire-Géographie',
    code: 'HG',
    description: 'Histoire du Cameroun, géographie et éducation civique',
    coefficient: 2,
    heuresParSemaine: 3,
    section: 'Francophone',
    classes: ['CE2', 'CM1', 'CM2'],
    enseignants: ['Mme Foning Clarisse'],
    couleur: '#F59E0B'
  },
  {
    id: '6',
    nom: 'Mathematics',
    code: 'MATH-EN',
    description: 'Numbers, shapes, problem solving and logical thinking',
    coefficient: 4,
    heuresParSemaine: 6,
    section: 'Anglophone',
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    enseignants: ['Mr. Ashu Robert', 'Mrs. Mbua Alice'],
    couleur: '#3B82F6'
  },
  {
    id: '7',
    nom: 'English Language',
    code: 'ENG',
    description: 'Reading, writing, spelling and grammar',
    coefficient: 4,
    heuresParSemaine: 8,
    section: 'Anglophone',
    classes: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    enseignants: ['Mrs. Tabi Grace', 'Mrs. Ayuk Helen'],
    couleur: '#EF4444'
  },
  {
    id: '8',
    nom: 'Social Studies',
    code: 'SS',
    description: 'History, geography and civic education',
    coefficient: 2,
    heuresParSemaine: 3,
    section: 'Anglophone',
    classes: ['Class 3', 'Class 4', 'Class 5'],
    enseignants: ['Mr. Njong Martin'],
    couleur: '#F59E0B'
  }
];

const STORAGE_KEY = 'subjects';

function getSubjects(): Subject[] {
  if (typeof window === 'undefined') return INITIAL_SUBJECTS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBJECTS));
    return INITIAL_SUBJECTS;
  }
  return JSON.parse(data);
}

function saveSubjects(subjects: Subject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

function addSubject(subject: Subject) {
  const subjects = getSubjects();
  subjects.push(subject);
  saveSubjects(subjects);
}

function updateSubject(id: string, updated: Partial<Subject>) {
  const subjects = getSubjects();
  const idx = subjects.findIndex((s) => s.id === id);
  if (idx !== -1) {
    subjects[idx] = { ...subjects[idx], ...updated };
    saveSubjects(subjects);
  }
}

function deleteSubject(id: string) {
  const subjects = getSubjects().filter((s) => s.id !== id);
  saveSubjects(subjects);
}

const COULEURS_DISPONIBLES = [
  '#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B',
  '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#84CC16'
];

interface SubjectFormProps {
  subject?: Subject | null;
  onClose: () => void;
  onSaved: () => void;
}

function SubjectForm({ subject, onClose, onSaved }: SubjectFormProps) {
  const [form, setForm] = useState({
    nom: subject?.nom || "",
    code: subject?.code || "",
    description: subject?.description || "",
    coefficient: subject?.coefficient || 1,
    heuresParSemaine: subject?.heuresParSemaine || 1,
    section: subject?.section || "Francophone",
    classes: subject?.classes || [],
    enseignants: subject?.enseignants || [],
    couleur: subject?.couleur || COULEURS_DISPONIBLES[0],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const CLASSES_DISPONIBLES = {
    'Francophone': ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    'Anglophone': ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'classes') {
        setForm(prev => ({
          ...prev,
          classes: checked 
            ? [...prev.classes, value]
            : prev.classes.filter(c => c !== value)
        }));
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: name === 'coefficient' || name === 'heuresParSemaine' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleEnseignantChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enseignants = e.target.value.split('\n').filter(e => e.trim() !== '');
    setForm(prev => ({ ...prev, enseignants }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.nom || !form.code || !form.description || form.classes.length === 0) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (subject) {
        updateSubject(subject.id, form);
      } else {
        addSubject({
          id: Date.now().toString(),
          ...form,
        });
      }
      onSaved();
      onClose();
    } catch (error) {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {subject ? "Modifier la matière" : "Ajouter une matière"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la matière *
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ex: Mathématiques, Français..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code *
              </label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ex: MATH, FR, EN..."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Description de la matière..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                name="section"
                value={form.section}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Francophone">Francophone</option>
                <option value="Anglophone">Anglophone</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coefficient
              </label>
              <input
                name="coefficient"
                type="number"
                min="1"
                max="10"
                value={form.coefficient}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heures/semaine
              </label>
              <input
                name="heuresParSemaine"
                type="number"
                min="1"
                max="20"
                value={form.heuresParSemaine}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Classes concernées *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CLASSES_DISPONIBLES[form.section as keyof typeof CLASSES_DISPONIBLES].map((classe) => (
                <label key={classe} className="flex items-center">
                  <input
                    type="checkbox"
                    name="classes"
                    value={classe}
                    checked={form.classes.includes(classe)}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{classe}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enseignants (un par ligne)
            </label>
            <textarea
              value={form.enseignants.join('\n')}
              onChange={handleEnseignantChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="M. Dupont Jean&#10;Mme Martin Claire&#10;..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur
            </label>
            <div className="flex space-x-2">
              {COULEURS_DISPONIBLES.map((couleur) => (
                <button
                  key={couleur}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, couleur }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    form.couleur === couleur ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: couleur }}
                />
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </motion.div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {subject ? "Enregistrer" : "Ajouter"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editSubject, setEditSubject] = useState<Subject | null>(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    let filtered = subjects.filter(subject => {
      const matchesSearch = 
        subject.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSection = selectedSection === "all" || subject.section === selectedSection;
      
      return matchesSearch && matchesSection;
    });

    setFilteredSubjects(filtered);
  }, [subjects, searchTerm, selectedSection]);

  const loadSubjects = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getSubjects();
      setSubjects(data);
      setFilteredSubjects(data);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (subject: Subject) => {
    setEditSubject(subject);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      deleteSubject(id);
      loadSubjects();
    }
  };

  const handleFormSaved = () => {
    loadSubjects();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Matières</h1>
          <p className="text-gray-600 mt-1">Gérez le programme scolaire et les matières enseignées</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditSubject(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une matière
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom ou code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">Toutes sections</option>
            <option value="Francophone">Francophone</option>
            <option value="Anglophone">Anglophone</option>
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {filteredSubjects.length} matière(s) trouvée(s) sur {subjects.length} au total
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredSubjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: subject.couleur }}
                    >
                      {subject.code}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{subject.nom}</h3>
                      <p className="text-sm text-gray-500">{subject.section}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{subject.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span>Coefficient: {subject.coefficient}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{subject.heuresParSemaine}h/semaine</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{subject.classes.length} classe(s)</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {subject.classes.slice(0, 3).map((classe) => (
                      <span 
                        key={classe}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {classe}
                      </span>
                    ))}
                    {subject.classes.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{subject.classes.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center text-indigo-600">
                    <BookMarked className="w-4 h-4 mr-1" />
                    <span className="text-sm">{subject.enseignants.length} enseignant(s)</span>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(subject)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(subject.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune matière trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Essayez de modifier vos critères de recherche." : "Commencez par ajouter votre première matière."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditSubject(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une matière
          </motion.button>
        </motion.div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <SubjectForm
            subject={editSubject}
            onClose={() => {
              setShowForm(false);
              setEditSubject(null);
            }}
            onSaved={handleFormSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}