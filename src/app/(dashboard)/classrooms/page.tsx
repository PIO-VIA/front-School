"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Building, 
  Users, 
  MapPin, 
  Edit, 
  Trash2, 
  Info,
  X,
  Save,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { 
  getClassrooms, 
  addClassroom, 
  updateClassroom, 
  deleteClassroom,
  Classroom 
} from "./components/classroomData";

interface ClassroomFormProps {
  classroom?: Classroom | null;
  onClose: () => void;
  onSaved: () => void;
}

function ClassroomForm({ classroom, onClose, onSaved }: ClassroomFormProps) {
  const [form, setForm] = useState({
    nom: classroom?.nom || "",
    capacite: classroom?.capacite || 0,
    localisation: classroom?.localisation || "",
    description: classroom?.description || "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "capacite" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.nom || !form.localisation || form.capacite <= 0) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (classroom) {
        updateClassroom(classroom.id, form);
      } else {
        addClassroom({
          id: Date.now().toString(),
          ...form,
        });
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
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
            {classroom ? "Modifier la salle" : "Ajouter une salle"}
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
              Nom de la salle *
            </label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: Salle A, Laboratoire..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacité *
            </label>
            <input
              name="capacite"
              type="number"
              min="1"
              value={form.capacite}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Nombre d'élèves"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localisation *
            </label>
            <input
              name="localisation"
              value={form.localisation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: Bâtiment A, 1er étage"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Description optionnelle..."
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
              {classroom ? "Enregistrer" : "Ajouter"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editClassroom, setEditClassroom] = useState<Classroom | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    loadClassrooms();
  }, []);

  useEffect(() => {
    const filtered = classrooms.filter(classroom =>
      classroom.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.localisation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClassrooms(filtered);
  }, [classrooms, searchTerm]);

  const loadClassrooms = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getClassrooms();
      setClassrooms(data);
      setFilteredClassrooms(data);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (classroom: Classroom) => {
    setEditClassroom(classroom);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette salle ?")) {
      deleteClassroom(id);
      loadClassrooms();
    }
  };

  const handleFormSaved = () => {
    loadClassrooms();
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Salles</h1>
          <p className="text-gray-600 mt-1">Gérez les salles de classe et leurs informations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditClassroom(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une salle
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
            placeholder="Rechercher par nom ou localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {filteredClassrooms.length} salle(s) trouvée(s) sur {classrooms.length} au total
        </div>
      </motion.div>

      {/* Classrooms Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredClassrooms.map((classroom) => (
            <motion.div
              key={classroom.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{classroom.nom}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {classroom.localisation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">Capacité: <strong>{classroom.capacite} élèves</strong></span>
                  </div>
                  {classroom.description && (
                    <p className="text-sm text-gray-600">{classroom.description}</p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <button
                    onClick={() => setSelectedClassroom(classroom)}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    <span className="text-sm">Détails</span>
                  </button>

                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(classroom)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(classroom.id)}
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

      {filteredClassrooms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune salle trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Essayez de modifier vos critères de recherche." : "Commencez par ajouter votre première salle."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditClassroom(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une salle
          </motion.button>
        </motion.div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ClassroomForm
            classroom={editClassroom}
            onClose={() => {
              setShowForm(false);
              setEditClassroom(null);
            }}
            onSaved={handleFormSaved}
          />
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedClassroom && (
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
                <h2 className="text-xl font-bold text-gray-900">Détails de la salle</h2>
                <button
                  onClick={() => setSelectedClassroom(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedClassroom.nom}</h3>
                    <p className="text-gray-600">{selectedClassroom.localisation}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Capacité</span>
                    <span className="text-sm text-gray-900 font-semibold">{selectedClassroom.capacite} élèves</span>
                  </div>
                  {selectedClassroom.description && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Description</span>
                      <p className="text-sm text-gray-600 mt-1">{selectedClassroom.description}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">Salle disponible</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}