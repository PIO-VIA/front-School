// Données améliorées pour les salles (inspirées du Cameroun)
export type Classroom = {
  id: string;
  nom: string;
  capacite: number;
  localisation: string;
  description?: string;
  equipements: string[];
  statut: 'disponible' | 'occupee' | 'maintenance';
  responsable?: string;
  emploiDuTemps: {
    jour: string;
    heures: string;
    classe: string;
    matiere: string;
  }[];
};

const EXAMPLE_CLASSROOMS: Classroom[] = [
  {
    id: '1',
    nom: 'Salle A - Primaire',
    capacite: 40,
    localisation: 'Bâtiment Principal, Rez-de-chaussée',
    description: 'Salle lumineuse avec ventilation naturelle, adaptée aux classes de CP et CE1',
    equipements: ['Tableau noir', 'Bureau enseignant', '40 tables-bancs', 'Armoire', 'Ventilateurs'],
    statut: 'disponible',
    responsable: 'Mme Ngono Célestine',
    emploiDuTemps: [
      { jour: 'Lundi', heures: '07h30-12h00', classe: 'CP', matiere: 'Français' },
      { jour: 'Lundi', heures: '14h00-16h30', classe: 'CP', matiere: 'Mathématiques' },
      { jour: 'Mardi', heures: '07h30-12h00', classe: 'CP', matiere: 'Lecture' },
    ]
  },
  {
    id: '2',
    nom: 'Salle Informatique',
    capacite: 25,
    localisation: 'Bloc B, 1er étage',
    description: 'Salle équipée d\'ordinateurs pour l\'initiation informatique',
    equipements: ['25 ordinateurs', 'Projecteur', 'Écran de projection', 'Climatisation', 'Connexion Internet'],
    statut: 'disponible',
    responsable: 'M. Takougang Paul',
    emploiDuTemps: [
      { jour: 'Mercredi', heures: '08h00-10h00', classe: 'CM1', matiere: 'Informatique' },
      { jour: 'Jeudi', heures: '10h00-12h00', classe: 'CM2', matiere: 'Informatique' },
    ]
  },
  {
    id: '3',
    nom: 'Salle Polyvalente',
    capacite: 60,
    localisation: 'Annexe',
    description: 'Grande salle pour réunions, cérémonies et activités culturelles',
    equipements: ['Sono', 'Estrade', 'Chaises mobiles', 'Éclairage LED', 'Climatisation'],
    statut: 'disponible',
    responsable: 'M. Essomba Jean-Pierre',
    emploiDuTemps: [
      { jour: 'Vendredi', heures: '09h00-11h00', classe: 'Tous', matiere: 'Assemblée générale' },
    ]
  },
  {
    id: '4',
    nom: 'Salle B - Français',
    capacite: 35,
    localisation: 'Bâtiment Principal, 1er étage',
    description: 'Salle dédiée aux cours de français avec bibliothèque de classe',
    equipements: ['Tableau blanc', 'Bibliothèque', 'Cartes géographiques', 'Affiches pédagogiques'],
    statut: 'occupee',
    responsable: 'Mme Foning Clarisse',
    emploiDuTemps: [
      { jour: 'Lundi', heures: '07h30-12h00', classe: 'CE1', matiere: 'Français' },
      { jour: 'Mardi', heures: '07h30-12h00', classe: 'CE2', matiere: 'Français' },
      { jour: 'Mercredi', heures: '07h30-11h00', classe: 'CE1', matiere: 'Lecture' },
    ]
  },
  {
    id: '5',
    nom: 'Salle C - Sciences',
    capacite: 30,
    localisation: 'Bloc C, Rez-de-chaussée',
    description: 'Laboratoire de sciences naturelles avec matériel d\'expérimentation',
    equipements: ['Paillasses', 'Microscopes', 'Matériel d\'expérience', 'Squelette humain', 'Tableau interactif'],
    statut: 'maintenance',
    responsable: 'M. Bomda Victor',
    emploiDuTemps: []
  },
  {
    id: '6',
    nom: 'Room F - English',
    capacite: 28,
    localisation: 'Block A, Ground Floor',
    description: 'Classroom dedicated to English language teaching with audio-visual equipment',
    equipements: ['Whiteboard', 'Audio system', 'English posters', 'Dictionary corner', 'Projector'],
    statut: 'disponible',
    responsable: 'Mrs. Tabi Grace',
    emploiDuTemps: [
      { jour: 'Monday', heures: '07h30-12h00', classe: 'Class 1', matiere: 'English Language' },
      { jour: 'Tuesday', heures: '07h30-12h00', classe: 'Class 2', matiere: 'English Language' },
      { jour: 'Wednesday', heures: '07h30-11h00', classe: 'Class 3', matiere: 'Reading' },
    ]
  },
  {
    id: '7',
    nom: 'Salle Arts Plastiques',
    capacite: 25,
    localisation: 'Atelier, Rez-de-jardin',
    description: 'Atelier créatif pour les cours d\'arts plastiques et travaux manuels',
    equipements: ['Tables de travail', 'Matériel de dessin', 'Peintures', 'Éviers', 'Rangements'],
    statut: 'disponible',
    responsable: 'Mme Ayuk Helen',
    emploiDuTemps: [
      { jour: 'Jeudi', heures: '14h00-16h00', classe: 'CM1', matiere: 'Arts Plastiques' },
      { jour: 'Vendredi', heures: '14h00-16h00', classe: 'CM2', matiere: 'Arts Plastiques' },
    ]
  },
  {
    id: '8',
    nom: 'Bibliothèque',
    capacite: 50,
    localisation: 'Bâtiment Central, 2ème étage',
    description: 'Espace de lecture et de recherche avec collection bilingue',
    equipements: ['Étagères', '500+ livres', 'Tables de lecture', 'Espace numérique', 'Climatisation'],
    statut: 'disponible',
    responsable: 'Mme Mbua Alice',
    emploiDuTemps: [
      { jour: 'Tous les jours', heures: '07h00-17h00', classe: 'Toutes', matiere: 'Lecture libre' },
    ]
  }
];

const STORAGE_KEY = 'classrooms';

function getClassrooms(): Classroom[] {
  if (typeof window === 'undefined') return EXAMPLE_CLASSROOMS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EXAMPLE_CLASSROOMS));
    return EXAMPLE_CLASSROOMS;
  }
  return JSON.parse(data);
}

function saveClassrooms(classrooms: Classroom[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classrooms));
}

function addClassroom(classroom: Classroom) {
  const classrooms = getClassrooms();
  classrooms.push(classroom);
  saveClassrooms(classrooms);
}

function updateClassroom(id: string, updated: Partial<Classroom>) {
  const classrooms = getClassrooms();
  const idx = classrooms.findIndex((c) => c.id === id);
  if (idx !== -1) {
    classrooms[idx] = { ...classrooms[idx], ...updated };
    saveClassrooms(classrooms);
  }
}

function deleteClassroom(id: string) {
  const classrooms = getClassrooms().filter((c) => c.id !== id);
  saveClassrooms(classrooms);
}

export {
  getClassrooms,
  addClassroom,
  updateClassroom,
  deleteClassroom,
};