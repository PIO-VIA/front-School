"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Users, 
  Edit, 
  Trash2, 
  X,
  Save,
  AlertCircle,
  GraduationCap,
  ChevronDown,
  ChevronRight
} from "lucide-react";

export type Section = {
  id: string;
  nom: string;
  description: string;
  classes: ClasseInfo[];
  totalEleves: number;
};

export type ClasseInfo = {
  id: string;
  nom: string;
  niveau: string;
  nombreEleves: number;
  enseignantPrincipal?: string;
  salle?: string;
};

// Données simulées camerounaises
const INITIAL_SECTIONS: Section[] = [
  {
    id: '1',
    nom: 'Section Francophone',
    description: 'Section d\'enseignement en français selon le système éducatif camerounais',
    totalEleves: 145,
    classes: [
      { id: 'c1', nom: 'CP', niveau: 'Cours Préparatoire', nombreEleves: 25, enseignantPrincipal: 'Mme Ngono Célestine', salle: 'Salle A' },
      { id: 'c2', nom: 'CE1', niveau: 'Cours Élémentaire 1', nombreEleves: 28, enseignantPrincipal: 'M. Essomba Jean-Pierre', salle: 'Salle B' },
      { id: 'c3', nom: 'CE2', niveau: 'Cours Élémentaire 2', nombreEleves: 30, enseignantPrincipal: 'Mme Foning Clarisse', salle: 'Salle C' },
      { id: 'c4', nom: 'CM1', niveau: 'Cours Moyen 1', nombreEleves: 32, enseignantPrincipal: 'M. Takougang Paul', salle: 'Salle D' },
      { id: 'c5', nom: 'CM2', niveau: 'Cours Moyen 2', nombreEleves: 30, enseignantPrincipal: 'Mme Bomda Victoire', salle: 'Salle E' },
    ]
  },
  {
    id: '2',
    nom: 'Section Anglophone',
    description: 'Section d\'enseignement en anglais selon le système éducatif anglo-saxon',
    totalEleves: 87,
    classes: [
      { id: 'c6', nom: 'Class 1', niveau: 'Primary One', nombreEleves: 15, enseignantPrincipal: 'Mrs. Tabi Grace', salle: 'Room F' },
      { id: 'c7', nom: 'Class 2', niveau: 'Primary Two', nombreEleves: 16, enseignantPrincipal: 'Mr. Njong Martin', salle: 'Room G' },
      { id: 'c8', nom: 'Class 3', niveau: 'Primary Three', nombreEleves: 18, enseignantPrincipal: 'Mrs. Ayuk Helen', salle: 'Room H' },
      { id: 'c9', nom: 'Class 4', niveau: 'Primary Four', nombreEleves: 19, enseignantPrincipal: 'Mr. Ashu Robert', salle: 'Room I' },
      { id: 'c10', nom: 'Class 5', niveau: 'Primary Five', nombreEleves: 19, enseignantPrincipal: 'Mrs. Mbua Alice', salle: 'Room J' },
    ]
  }
];

const STORAGE_KEY = 'sections';

function getSections(): Section[] {
  if (typeof window === 'undefined') return INITIAL_SECTIONS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SECTIONS));
    return INITIAL_SECTIONS;
  }
  return JSON.parse(data);
}

function saveSections(sections: Section[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
}

function addSection(section: Section) {
  const sections = getSections();
  sections.push(section);
  saveSections(sections);
}

function updateSection(id: string, updated: Partial<Section>) {
  const sections = getSections();
  const idx = sections.findIndex((s) => s.id === id);
  if (idx !== -1) {
    sections[idx] = { ...sections[idx], ...updated };
    saveSections(sections);
  }
}

function deleteSection(id: string) {
  const sections = getSections().filter((s) => s.id !== id);
  saveSections(sections);
}

interface SectionFormProps {
  section?: Section | null;
  onClose: () => void;
  onSaved: () => void;
}

function SectionForm({ section, onClose, onSaved }: SectionFormProps) {
  const [form, setForm] = useState({
    nom: section?.nom || "",
    description: section?.description || "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.nom || !form.description) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (section) {
        updateSection(section.id, form);
      } else {
        addSection({
          id: Date.now().toString(),
          ...form,
          classes: [],
          totalEleves: 0,
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {section ? "Modifier la section" : "Ajouter une section"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la section *
            </label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: Section Francophone, Section Anglophone"
              required
            />
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
              placeholder="Description de la section..."
              required
            />
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
              {section ? "Enregistrer" : "Ajouter"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function SectionCard({ section, onEdit, onDelete }: { section: Section; onEdit: (section: Section) => void; onDelete: (id: string) => void; }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{section.nom}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {section.totalEleves} élèves • {section.classes.length} classes
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(section)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="Modifier"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(section.id)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{section.description}</p>

        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors w-full"
        >
          {expanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
          <span className="text-sm font-medium">
            {expanded ? "Masquer les classes" : "Voir les classes"}
          </span>
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {section.classes.map((classe) => (
                <motion.div
                  key={classe.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="bg-gray-50 rounded-lg p-3 border-l-4 border-indigo-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{classe.nom}</h4>
                      <p className="text-xs text-gray-600">{classe.niveau}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {classe.nombreEleves} élèves
                      </div>
                      <div className="text-xs text-gray-500">{classe.salle}</div>
                    </div>
                  </div>
                  {classe.enseignantPrincipal && (
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {classe.enseignantPrincipal}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editSection, setEditSection] = useState<Section | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  useEffect(() => {
    const filtered = sections.filter(section =>
      section.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  }, [sections, searchTerm]);

  const loadSections = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getSections();
      setSections(data);
      setFilteredSections(data);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (section: Section) => {
    setEditSection(section);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette section ? Cette action supprimera également toutes les classes associées.")) {
      deleteSection(id);
      loadSections();
    }
  };

  const handleFormSaved = () => {
    loadSections();
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

  const totalEleves = sections.reduce((sum, section) => sum + section.totalEleves, 0);
  const totalClasses = sections.reduce((sum, section) => sum + section.classes.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Sections</h1>
          <p className="text-gray-600 mt-1">
            {sections.length} sections • {totalClasses} classes • {totalEleves} élèves
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditSection(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une section
        </motion.button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Sections Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredSections.map((section) => (
            <motion.div key={section.id} variants={itemVariants} layout>
              <SectionCard
                section={section}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune section trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Essayez de modifier vos critères de recherche." : "Commencez par ajouter votre première section."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditSection(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une section
          </motion.button>
        </motion.div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <SectionForm
            section={editSection}
            onClose={() => {
              setShowForm(false);
              setEditSection(null);
            }}
            onSaved={handleFormSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}