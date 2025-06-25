"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  XCircle,
  Edit, 
  Trash2, 
  X,
  Save,
  AlertCircle,
  User,
  School,
  CreditCard,
  FileText,
  Phone,
  MapPin
} from "lucide-react";

export type Enrollment = {
  id: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  classe: string;
  section: string;
  annee: string;
  dateInscription: string;
  statut: 'en_attente' | 'confirmee' | 'annulee';
  fraisInscription: number;
  fraisPaies: number;
  documents: {
    certificatNaissance: boolean;
    bulletinPrecedent: boolean;
    certificatMedical: boolean;
    photos: boolean;
  };
  tuteur: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    adresse: string;
    profession: string;
  };
  observations: string;
};

// Données simulées camerounaises
const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Brice Mbiya',
    classe: 'CM2',
    section: 'Francophone',
    annee: '2024-2025',
    dateInscription: '2024-08-15',
    statut: 'confirmee',
    fraisInscription: 45000,
    fraisPaies: 45000,
    documents: {
      certificatNaissance: true,
      bulletinPrecedent: true,
      certificatMedical: true,
      photos: true
    },
    tuteur: {
      nom: 'Mbiya',
      prenom: 'Joseph',
      telephone: '690123456',
      email: 'joseph.mbiya@email.com',
      adresse: 'Bastos, Yaoundé',
      profession: 'Ingénieur'
    },
    observations: 'Élève sérieux, bon niveau en mathématiques'
  },
  {
    id: '2', 
    studentId: '2',
    studentName: 'Aminatou Ngono',
    classe: 'Class 6',
    section: 'Anglophone',
    annee: '2024-2025',
    dateInscription: '2024-08-20',
    statut: 'en_attente',
    fraisInscription: 50000,
    fraisPaies: 25000,
    documents: {
      certificatNaissance: true,
      bulletinPrecedent: true,
      certificatMedical: false,
      photos: true
    },
    tuteur: {
      nom: 'Ngono',
      prenom: 'Célestine',
      telephone: '677654321',
      email: 'celestine.ngono@email.com',
      adresse: 'Bonamoussadi, Douala',
      profession: 'Commerçante'
    },
    observations: 'En attente du certificat médical'
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'Kevin Foning',
    classe: 'CE1',
    section: 'Francophone', 
    annee: '2024-2025',
    dateInscription: '2024-09-05',
    statut: 'en_attente',
    fraisInscription: 40000,
    fraisPaies: 0,
    documents: {
      certificatNaissance: true,
      bulletinPrecedent: false,
      certificatMedical: true,
      photos: false
    },
    tuteur: {
      nom: 'Foning',
      prenom: 'Paul',
      telephone: '699887766',
      email: 'paul.foning@email.com',
      adresse: 'Mvan, Yaoundé',
      profession: 'Enseignant'
    },
    observations: 'Nouvelle inscription, documents en cours'
  }
];

const STORAGE_KEY = 'enrollments';

function getEnrollments(): Enrollment[] {
  if (typeof window === 'undefined') return INITIAL_ENROLLMENTS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ENROLLMENTS));
    return INITIAL_ENROLLMENTS;
  }
  return JSON.parse(data);
}

function saveEnrollments(enrollments: Enrollment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
}

function addEnrollment(enrollment: Enrollment) {
  const enrollments = getEnrollments();
  enrollments.push(enrollment);
  saveEnrollments(enrollments);
}

function updateEnrollment(id: string, updated: Partial<Enrollment>) {
  const enrollments = getEnrollments();
  const idx = enrollments.findIndex((e) => e.id === id);
  if (idx !== -1) {
    enrollments[idx] = { ...enrollments[idx], ...updated };
    saveEnrollments(enrollments);
  }
}

function deleteEnrollment(id: string) {
  const enrollments = getEnrollments().filter((e) => e.id !== id);
  saveEnrollments(enrollments);
}

const CLASSES_DISPONIBLES = [
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'
];

const FRAIS_PAR_CLASSE: { [key: string]: number } = {
  'CP': 35000, 'CE1': 40000, 'CE2': 40000, 'CM1': 45000, 'CM2': 45000,
  'Class 1': 40000, 'Class 2': 45000, 'Class 3': 45000, 'Class 4': 50000, 'Class 5': 50000
};

function getStatusInfo(statut: string) {
  switch (statut) {
    case 'confirmee':
      return { label: 'Confirmée', color: 'bg-green-100 text-green-800', icon: CheckCircle };
    case 'en_attente':
      return { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    case 'annulee':
      return { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: XCircle };
    default:
      return { label: 'Inconnue', color: 'bg-gray-100 text-gray-800', icon: Clock };
  }
}

interface EnrollmentFormProps {
  enrollment?: Enrollment | null;
  onClose: () => void;
  onSaved: () => void;
}

function EnrollmentForm({ enrollment, onClose, onSaved }: EnrollmentFormProps) {
  const [form, setForm] = useState({
    studentName: enrollment?.studentName || "",
    classe: enrollment?.classe || "",
    section: enrollment?.section || "Francophone",
    annee: enrollment?.annee || "2024-2025",
    dateInscription: enrollment?.dateInscription || new Date().toISOString().split('T')[0],
    statut: enrollment?.statut || "en_attente",
    fraisInscription: enrollment?.fraisInscription || 0,
    fraisPaies: enrollment?.fraisPaies || 0,
    tuteurNom: enrollment?.tuteur.nom || "",
    tuteurPrenom: enrollment?.tuteur.prenom || "",
    tuteurTelephone: enrollment?.tuteur.telephone || "",
    tuteurEmail: enrollment?.tuteur.email || "",
    tuteurAdresse: enrollment?.tuteur.adresse || "",
    tuteurProfession: enrollment?.tuteur.profession || "",
    observations: enrollment?.observations || "",
    documents: enrollment?.documents || {
      certificatNaissance: false,
      bulletinPrecedent: false,
      certificatMedical: false,
      photos: false
    }
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (form.classe && FRAIS_PAR_CLASSE[form.classe]) {
      setForm(prev => ({ ...prev, fraisInscription: FRAIS_PAR_CLASSE[form.classe] }));
    }
  }, [form.classe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith('doc_')) {
        const docKey = name.replace('doc_', '');
        setForm(prev => ({
          ...prev,
          documents: { ...prev.documents, [docKey]: checked }
        }));
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: name === 'fraisInscription' || name === 'fraisPaies' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.studentName || !form.classe || !form.tuteurNom || !form.tuteurTelephone) {
      setError("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const enrollmentData: Enrollment = {
        id: enrollment?.id || Date.now().toString(),
        studentId: enrollment?.studentId || Date.now().toString(),
        studentName: form.studentName,
        classe: form.classe,
        section: form.section,
        annee: form.annee,
        dateInscription: form.dateInscription,
        statut: form.statut as 'en_attente' | 'confirmee' | 'annulee',
        fraisInscription: form.fraisInscription,
        fraisPaies: form.fraisPaies,
        documents: form.documents,
        tuteur: {
          nom: form.tuteurNom,
          prenom: form.tuteurPrenom,
          telephone: form.tuteurTelephone,
          email: form.tuteurEmail,
          adresse: form.tuteurAdresse,
          profession: form.tuteurProfession
        },
        observations: form.observations
      };

      if (enrollment) {
        updateEnrollment(enrollment.id, enrollmentData);
      } else {
        addEnrollment(enrollmentData);
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
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {enrollment ? "Modifier l'inscription" : "Nouvelle inscription"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations élève */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600" />
              Informations de l'élève
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet de l'élève *
                </label>
                <input
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Prénom Nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classe *
                </label>
                <select
                  name="classe"
                  value={form.classe}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Choisir une classe</option>
                  {CLASSES_DISPONIBLES.map(classe => (
                    <option key={classe} value={classe}>{classe}</option>
                  ))}
                </select>
              </div>
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
            </div>
          </div>

          {/* Informations tuteur */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-indigo-600" />
              Informations du tuteur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  name="tuteurNom"
                  value={form.tuteurNom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  name="tuteurPrenom"
                  value={form.tuteurPrenom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  name="tuteurTelephone"
                  value={form.tuteurTelephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="690123456"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  name="tuteurEmail"
                  type="email"
                  value={form.tuteurEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  name="tuteurAdresse"
                  value={form.tuteurAdresse}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  name="tuteurProfession"
                  value={form.tuteurProfession}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Informations administratives */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <School className="w-5 h-5 mr-2 text-indigo-600" />
              Informations administratives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année scolaire
                </label>
                <input
                  name="annee"
                  value={form.annee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'inscription
                </label>
                <input
                  name="dateInscription"
                  type="date"
                  value={form.dateInscription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  name="statut"
                  value={form.statut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="en_attente">En attente</option>
                  <option value="confirmee">Confirmée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </div>
            </div>
          </div>

          {/* Frais */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
              Frais de scolarité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frais d'inscription (FCFA)
                </label>
                <input
                  name="fraisInscription"
                  type="number"
                  value={form.fraisInscription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frais payés (FCFA)
                </label>
                <input
                  name="fraisPaies"
                  type="number"
                  value={form.fraisPaies}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            {form.fraisInscription > 0 && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Reste à payer: <strong>{(form.fraisInscription - form.fraisPaies).toLocaleString()} FCFA</strong>
                </p>
              </div>
            )}
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-indigo-600" />
              Documents requis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'certificatNaissance', label: 'Certificat de naissance' },
                { key: 'bulletinPrecedent', label: 'Bulletin précédent' },
                { key: 'certificatMedical', label: 'Certificat médical' },
                { key: 'photos', label: 'Photos d\'identité' }
              ].map(doc => (
                <label key={doc.key} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`doc_${doc.key}`}
                    checked={form.documents[doc.key as keyof typeof form.documents]}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{doc.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observations
            </label>
            <textarea
              name="observations"
              value={form.observations}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Observations particulières..."
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

          <div className="flex justify-end space-x-3 pt-4 border-t">
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
              {enrollment ? "Enregistrer" : "Inscrire"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [selectedAnnee, setSelectedAnnee] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editEnrollment, setEditEnrollment] = useState<Enrollment | null>(null);

  useEffect(() => {
    loadEnrollments();
  }, []);

  useEffect(() => {
    let filtered = enrollments.filter(enrollment => {
      const matchesSearch = 
        enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.tuteur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.tuteur.telephone.includes(searchTerm);
      
      const matchesStatut = selectedStatut === "all" || enrollment.statut === selectedStatut;
      const matchesAnnee = selectedAnnee === "all" || enrollment.annee === selectedAnnee;
      
      return matchesSearch && matchesStatut && matchesAnnee;
    });

    setFilteredEnrollments(filtered);
  }, [enrollments, searchTerm, selectedStatut, selectedAnnee]);

  const loadEnrollments = () => {
    setLoading(true);
    setTimeout(() => {
      const data = getEnrollments();
      setEnrollments(data);
      setFilteredEnrollments(data);
      setLoading(false);
    }, 500);
  };

  const handleEdit = (enrollment: Enrollment) => {
    setEditEnrollment(enrollment);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette inscription ?")) {
      deleteEnrollment(id);
      loadEnrollments();
    }
  };

  const handleFormSaved = () => {
    loadEnrollments();
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

  const totalInscriptions = enrollments.length;
  const inscriptionsConfirmees = enrollments.filter(e => e.statut === 'confirmee').length;
  const inscriptionsEnAttente = enrollments.filter(e => e.statut === 'en_attente').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Inscriptions</h1>
          <p className="text-gray-600 mt-1">
            {totalInscriptions} inscriptions • {inscriptionsConfirmees} confirmées • {inscriptionsEnAttente} en attente
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditEnrollment(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle inscription
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalInscriptions}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Confirmées</p>
              <p className="text-2xl font-bold text-gray-900">{inscriptionsConfirmees}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{inscriptionsEnAttente}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Recettes</p>
              <p className="text-2xl font-bold text-gray-900">
                {enrollments.reduce((sum, e) => sum + e.fraisPaies, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
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
              placeholder="Rechercher par nom d'élève, tuteur ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={selectedStatut}
              onChange={(e) => setSelectedStatut(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmées</option>
              <option value="annulee">Annulées</option>
            </select>

            <select
              value={selectedAnnee}
              onChange={(e) => setSelectedAnnee(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Toutes les années</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {filteredEnrollments.length} inscription(s) trouvée(s) sur {enrollments.length} au total
        </div>
      </motion.div>

      {/* Enrollments List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredEnrollments.map((enrollment) => {
            const statusInfo = getStatusInfo(enrollment.statut);
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={enrollment.id}
                variants={itemVariants}
                layout
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {enrollment.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{enrollment.studentName}</h3>
                        <p className="text-gray-600">{enrollment.classe} - {enrollment.section}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>Tuteur: {enrollment.tuteur.prenom} {enrollment.tuteur.nom}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{enrollment.tuteur.telephone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Inscrit le {new Date(enrollment.dateInscription).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-gray-600">
                          {enrollment.fraisPaies.toLocaleString()} / {enrollment.fraisInscription.toLocaleString()} FCFA
                        </span>
                        <div className="ml-2 w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${(enrollment.fraisPaies / enrollment.fraisInscription) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(enrollment)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(enrollment.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredEnrollments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune inscription trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? "Essayez de modifier vos critères de recherche." : "Commencez par enregistrer votre première inscription."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditEnrollment(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle inscription
          </motion.button>
        </motion.div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <EnrollmentForm
            enrollment={editEnrollment}
            onClose={() => {
              setShowForm(false);
              setEditEnrollment(null);
            }}
            onSaved={handleFormSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}