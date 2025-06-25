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
  FileText, 
  UserPlus,
  MoreVertical,
  SortAsc,
  SortDesc
} from "lucide-react";
import {
  getStudents,
  deleteStudent,
  Student,
} from "./studentData";

interface StudentListProps {
  onEdit: (student: Student) => void;
  onViewPresence: (student: Student) => void;
  onViewBulletin: (student: Student) => void;
  onInscription: (student: Student) => void;
}

export default function StudentList({
  onEdit,
  onViewPresence,
  onViewBulletin,
  onInscription,
}: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [sortField, setSortField] = useState<keyof Student>("nom");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const allStudents = getStudents();
    setStudents(allStudents);
    setFilteredStudents(allStudents);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesSearch = 
        student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.telephone.includes(searchTerm);
      
      const matchesSection = selectedSection === "all" || student.section === selectedSection;
      const matchesClass = selectedClass === "all" || student.classe === selectedClass;
      
      return matchesSearch && matchesSection && matchesClass;
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

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedSection, selectedClass, sortField, sortDirection]);

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cet élève ?")) {
      deleteStudent(id);
      setStudents(getStudents());
    }
  };

  const handleSort = (field: keyof Student) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Student) => {
    if (sortField === field) {
      return sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
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

  return (
    <div className="space-y-6">
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
              placeholder="Rechercher par nom, prénom ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Toutes sections</option>
              <option value="Francophone">Francophone</option>
              <option value="Anglophone">Anglophone</option>
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Toutes classes</option>
              <option value="CP">CP</option>
              <option value="CE1">CE1</option>
              <option value="CE2">CE2</option>
              <option value="CM1">CM1</option>
              <option value="CM2">CM2</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
            </select>

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
          {filteredStudents.length} élève(s) trouvé(s) sur {students.length} au total
        </div>
      </motion.div>

      {/* Students Table */}
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
                  { key: 'nom', label: 'Nom' },
                  { key: 'prenom', label: 'Prénom' },
                  { key: 'sexe', label: 'Sexe' },
                  { key: 'dateNaissance', label: 'Date de naissance' },
                  { key: 'section', label: 'Section' },
                  { key: 'classe', label: 'Classe' },
                  { key: 'telephone', label: 'Téléphone' },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort(column.key as keyof Student)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {getSortIcon(column.key as keyof Student)}
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
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
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
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {student.nom.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{student.nom}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.prenom}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.sexe === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {student.sexe === 'M' ? 'Masculin' : 'Féminin'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.dateNaissance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.section === 'Francophone' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.classe}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.telephone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          onClick={() => onEdit(student)}
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          onClick={() => handleDelete(student.id)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          onClick={() => onViewPresence(student)}
                          title="Présence"
                        >
                          <Calendar className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                          onClick={() => onViewBulletin(student)}
                          title="Bulletin"
                        >
                          <FileText className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                          onClick={() => onInscription(student)}
                          title="Inscription"
                        >
                          <UserPlus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun élève trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}