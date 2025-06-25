"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Calendar, 
  Phone,
  Mail,
  MoreVertical,
  SortAsc,
  SortDesc,
  GraduationCap,
  BookOpen,
  Users,
  MapPin,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserX,
  Eye,
  Star,
  Briefcase
} from "lucide-react";
import {
  getTeachers,
  deleteTeacher,
  Teacher,
} from "./teacherData";

interface TeacherListProps {
  onEdit: (teacher: Teacher) => void;
  onViewPresence: (teacher: Teacher) => void;
}

export default function TeacherList({
  onEdit,
  onViewPresence,
}: TeacherListProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [sortField, setSortField] = useState<keyof Teacher>("nom");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const allTeachers = getTeachers();
    setTeachers(allTeachers);
    setFilteredTeachers(allTeachers);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = teachers.filter(teacher => {
      const matchesSearch = 
        teacher.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.telephone.includes(searchTerm) ||
        teacher.matieres.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSection = selectedSection === "all" || teacher.section === selectedSection;
      const matchesStatut = selectedStatut === "all" || teacher.statut === selectedStatut;
      
      return matchesSearch && matchesSection && matchesStatut;
    });

    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toString() || "";
      const bValue = b[sortField]?.toString() || "";
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, selectedSection, selectedStatut, sortField, sortDirection]);

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
      deleteTeacher(id);
      setTeachers(getTeachers());
    }
  };

  const handleSort = (field: keyof Teacher) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Teacher) => {
    if (sortField === field) {
      return sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
    }
    return null;
  };

  const getStatutInfo = (statut: string) => {
    switch (statut) {
      case 'actif':
        return { label: 'Actif', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'conge':
        return { label: 'En congé', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'suspendu':
        return { label: 'Suspendu', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
      case 'demission':
        return { label: 'Démission', color: 'bg-gray-100 text-gray-800', icon: UserX };
      default:
        return { label: 'Inconnu', color: 'bg-gray-100 text-gray-800', icon: CheckCircle };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

  // Calculate stats
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.statut === 'actif').length;
  const avgExperience = teachers.reduce((sum, t) => {
    const years = new Date().getFullYear() - new Date(t.dateEmbauche).getFullYear();
    return sum + years;
  }, 0) / totalTeachers || 0;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Équipe Pédagogique</h1>
            <p className="text-emerald-100 mt-1">Gestion des enseignants et du personnel</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTeachers}</div>
              <div className="text-sm text-emerald-100">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{activeTeachers}</div>
              <div className="text-sm text-emerald-100">Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{avgExperience.toFixed(1)}</div>
              <div className="text-sm text-emerald-100">Ans d'exp. moy.</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, matière ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">Toutes sections</option>
              <option value="Francophone">Francophone</option>
              <option value="Anglophone">Anglophone</option>
            </select>

            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">Tous statuts</option>
              <option value="actif">Actif</option>
              <option value="conge">En congé</option>
              <option value="suspendu">Suspendu</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-white text-gray-600"}`}
              >
                <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-white text-gray-600"}`}
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                  <div className="h-0.5 bg-current rounded"></div>
                </div>
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredTeachers.length} enseignant(s) trouvé(s) sur {teachers.length} au total
        </div>
      </motion.div>

      {/* Teachers Display */}
      {viewMode === "grid" ? (
        /* Grid View */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTeachers.map((teacher) => {
              const statusInfo = getStatutInfo(teacher.statut);
              const StatusIcon = statusInfo.icon;
              const experienceYears = new Date().getFullYear() - new Date(teacher.dateEmbauche).getFullYear();
              
              return (
                <motion.div
                  key={teacher.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="relative p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                          {teacher.nom.charAt(0)}{teacher.prenom.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-semibold">{teacher.prenom} {teacher.nom}</h3>
                          <p className="text-emerald-100 text-sm">{teacher.section}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} bg-white`}>
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {statusInfo.label}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <BookOpen className="w-4 h-4 mr-3 text-emerald-500" />
                        <div>
                          <p className="text-sm font-medium">Matières</p>
                          <p className="text-xs text-gray-500">{teacher.matieres.slice(0, 2).join(", ")}
                            {teacher.matieres.length > 2 && ` +${teacher.matieres.length - 2}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-3 text-emerald-500" />
                        <div>
                          <p className="text-sm">{teacher.telephone}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-3 text-emerald-500" />
                        <div>
                          <p className="text-xs text-gray-500">{teacher.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Briefcase className="w-4 h-4 mr-3 text-emerald-500" />
                        <div>
                          <p className="text-sm font-medium">Expérience</p>
                          <p className="text-xs text-gray-500">{experienceYears} an(s)</p>
                        </div>
                      </div>
                    </div>

                    {/* Evaluation Stars */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {((teacher.evaluation.competencePedagogique + teacher.evaluation.relationEleves + teacher.evaluation.ponctualite) / 3).toFixed(1)}/5
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {teacher.congesRestants} jours de congé
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onEdit(teacher)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(teacher.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onViewPresence(teacher)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Présence"
                        >
                          <Calendar className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Détails
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* List View */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: 'nom', label: 'Enseignant' },
                    { key: 'section', label: 'Section' },
                    { key: 'matieres', label: 'Matières' },
                    { key: 'telephone', label: 'Contact' },
                    { key: 'dateEmbauche', label: 'Ancienneté' },
                    { key: 'statut', label: 'Statut' },
                  ].map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort(column.key as keyof Teacher)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.label}</span>
                        {getSortIcon(column.key as keyof Teacher)}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredTeachers.map((teacher, index) => {
                    const statusInfo = getStatutInfo(teacher.statut);
                    const StatusIcon = statusInfo.icon;
                    const experienceYears = new Date().getFullYear() - new Date(teacher.dateEmbauche).getFullYear();
                    
                    return (
                      <motion.tr
                        key={teacher.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        layout
                        className="hover:bg-gray-50 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                              {teacher.nom.charAt(0)}{teacher.prenom.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {teacher.prenom} {teacher.nom}
                              </div>
                              <div className="text-sm text-gray-500">{teacher.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            teacher.section === 'Francophone' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {teacher.section}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {teacher.matieres.slice(0, 2).join(", ")}
                            {teacher.matieres.length > 2 && (
                              <span className="text-gray-500"> +{teacher.matieres.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{teacher.telephone}</div>
                          <div className="text-xs text-gray-500">{teacher.adresse}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {experienceYears} an(s)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              onClick={() => onEdit(teacher)}
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              onClick={() => handleDelete(teacher.id)}
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              onClick={() => onViewPresence(teacher)}
                              title="Présence"
                            >
                              <Calendar className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {filteredTeachers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun enseignant trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
        </motion.div>
      )}
    </div>
  );
}