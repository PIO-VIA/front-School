// Données enrichies pour les élèves (inspirées du Cameroun)
export type Student = {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  dateNaissance: string;
  lieuNaissance: string;
  section: string;
  classe: string;
  adresse: string;
  telephone: string;
  email?: string;
  photo?: string;
  tuteur: {
    nom: string;
    prenom: string;
    telephone: string;
    email?: string;
    profession: string;
    adresse: string;
    relation: string; // père, mère, tuteur, etc.
  };
  urgence: {
    nom: string;
    telephone: string;
    relation: string;
  };
  medical: {
    allergies: string[];
    medicaments: string[];
    problemesSante: string[];
    docteur?: {
      nom: string;
      telephone: string;
    };
  };
  historiquePresence: PresenceRecord[];
  bulletin: Bulletin;
  comportement: {
    discipline: number; // sur 5
    participation: number; // sur 5
    travailEquipe: number; // sur 5
    ponctualite: number; // sur 5
  };
  activitesExtrascolaires: string[];
  dateInscription: string;
  statut: 'actif' | 'suspendu' | 'transfere' | 'diplome';
};

export type PresenceRecord = {
  date: string;
  present: boolean;
  retard?: boolean;
  excuse?: string;
};

export type Bulletin = {
  annee: string;
  trimestre: number;
  matieres: {
    nom: string;
    note: number;
    coefficient: number;
    appreciation: string;
  }[];
  moyenneGenerale: number;
  rang: number;
  effectif: number;
  appreciation: string;
  mention: string;
};

const EXAMPLE_STUDENTS: Student[] = [
  {
    id: '1',
    nom: 'Mbiya',
    prenom: 'Brice',
    sexe: 'M',
    dateNaissance: '2012-03-15',
    lieuNaissance: 'Yaoundé, Cameroun',
    section: 'Francophone',
    classe: 'CM2',
    adresse: 'Bastos, Yaoundé',
    telephone: '690123456',
    email: 'brice.mbiya@email.com',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Mbiya',
      prenom: 'Joseph',
      telephone: '690123456',
      email: 'joseph.mbiya@email.com',
      profession: 'Ingénieur Civil',
      adresse: 'Bastos, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Mbiya Clarisse',
      telephone: '677123456',
      relation: 'Mère'
    },
    medical: {
      allergies: ['Arachides'],
      medicaments: [],
      problemesSante: [],
      docteur: {
        nom: 'Dr. Fotso Martin',
        telephone: '699888777'
      }
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false, excuse: 'Maladie' },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true, retard: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Mathématiques', note: 15.5, coefficient: 4, appreciation: 'Bon travail, continue' },
        { nom: 'Français', note: 14.0, coefficient: 4, appreciation: 'Améliorer l\'orthographe' },
        { nom: 'Anglais', note: 13.5, coefficient: 2, appreciation: 'Participation active' },
        { nom: 'Éducation Civique', note: 16.0, coefficient: 2, appreciation: 'Excellent comportement' },
        { nom: 'Sciences', note: 14.5, coefficient: 3, appreciation: 'Bonne compréhension' },
        { nom: 'Histoire-Géographie', note: 13.0, coefficient: 2, appreciation: 'Effort à maintenir' },
      ],
      moyenneGenerale: 14.2,
      rang: 8,
      effectif: 32,
      appreciation: 'Élève sérieux et appliqué. Bon niveau général.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 4,
      travailEquipe: 5,
      ponctualite: 3
    },
    activitesExtrascolaires: ['Football', 'Chorale'],
    dateInscription: '2020-09-01',
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Ngono',
    prenom: 'Aminatou',
    sexe: 'F',
    dateNaissance: '2011-11-02',
    lieuNaissance: 'Douala, Cameroun',
    section: 'Anglophone',
    classe: 'Class 6',
    adresse: 'Bonamoussadi, Douala',
    telephone: '677654321',
    email: 'aminatou.ngono@email.com',
    photo: 'https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ngono',
      prenom: 'Célestine',
      telephone: '677654321',
      email: 'celestine.ngono@email.com',
      profession: 'Commerçante',
      adresse: 'Bonamoussadi, Douala',
      relation: 'Mère'
    },
    urgence: {
      nom: 'Ngono Paul',
      telephone: '699654321',
      relation: 'Père'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: ['Asthme léger'],
      docteur: {
        nom: 'Dr. Tabi Alice',
        telephone: '677999888'
      }
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: false, excuse: 'Rendez-vous médical' },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Mathematics', note: 17.0, coefficient: 4, appreciation: 'Excellent performance' },
        { nom: 'English Language', note: 16.5, coefficient: 4, appreciation: 'Outstanding skills' },
        { nom: 'Science', note: 15.5, coefficient: 3, appreciation: 'Very good understanding' },
        { nom: 'Social Studies', note: 16.0, coefficient: 2, appreciation: 'Active participation' },
        { nom: 'Physical Education', note: 14.0, coefficient: 1, appreciation: 'Good effort' },
      ],
      moyenneGenerale: 16.1,
      rang: 2,
      effectif: 28,
      appreciation: 'Excellent student with outstanding academic performance.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 4,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Mathematics Club', 'Debate Club', 'Dance'],
    dateInscription: '2019-09-01',
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Foning',
    prenom: 'Kevin',
    sexe: 'M',
    dateNaissance: '2015-08-20',
    lieuNaissance: 'Bafoussam, Cameroun',
    section: 'Francophone',
    classe: 'CE1',
    adresse: 'Mvan, Yaoundé',
    telephone: '699887766',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Foning',
      prenom: 'Paul',
      telephone: '699887766',
      email: 'paul.foning@email.com',
      profession: 'Enseignant',
      adresse: 'Mvan, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Foning Marie',
      telephone: '677887766',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: [],
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Mathématiques', note: 12.0, coefficient: 4, appreciation: 'Peut mieux faire' },
        { nom: 'Français', note: 13.5, coefficient: 4, appreciation: 'Bonne lecture' },
        { nom: 'Éducation Civique', note: 15.0, coefficient: 2, appreciation: 'Très bon comportement' },
        { nom: 'Sciences', note: 11.5, coefficient: 3, appreciation: 'Effort nécessaire' },
      ],
      moyenneGenerale: 12.8,
      rang: 15,
      effectif: 25,
      appreciation: 'Élève en progrès. Encourager les efforts.',
      mention: 'Assez Bien'
    },
    comportement: {
      discipline: 4,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Dessin', 'Jeux éducatifs'],
    dateInscription: '2022-09-01',
    statut: 'actif'
  },
  {
    id: '4',
    nom: 'Kouam',
    prenom: 'Fanta',
    sexe: 'F',
    dateNaissance: '2013-05-10',
    lieuNaissance: 'Garoua, Cameroun',
    section: 'Francophone',
    classe: 'CM1',
    adresse: 'Nlongkak, Yaoundé',
    telephone: '695123789',
    photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Kouam',
      prenom: 'Ibrahim',
      telephone: '695123789',
      profession: 'Mécanicien',
      adresse: 'Nlongkak, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Kouam Aissatou',
      telephone: '678123789',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: [],
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: false, excuse: 'Voyage famille' },
      { date: '2024-06-27', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Mathématiques', note: 16.5, coefficient: 4, appreciation: 'Très douée en calcul' },
        { nom: 'Français', note: 15.0, coefficient: 4, appreciation: 'Excellente expression' },
        { nom: 'Anglais', note: 14.0, coefficient: 2, appreciation: 'Bonne progression' },
        { nom: 'Sciences', note: 16.0, coefficient: 3, appreciation: 'Curiosité scientifique' },
        { nom: 'Histoire-Géographie', note: 15.5, coefficient: 2, appreciation: 'Très bonne culture' },
      ],
      moyenneGenerale: 15.4,
      rang: 3,
      effectif: 30,
      appreciation: 'Excellente élève, très motivée et studieuse.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 5,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Lecture', 'Sciences Club', 'Théâtre'],
    dateInscription: '2021-09-01',
    statut: 'actif'
  },
  {
    id: '5',
    nom: 'Ashu',
    prenom: 'Divine',
    sexe: 'F',
    dateNaissance: '2012-12-03',
    lieuNaissance: 'Bamenda, Cameroun',
    section: 'Anglophone',
    classe: 'Class 5',
    adresse: 'Mendong, Yaoundé',
    telephone: '683456789',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ashu',
      prenom: 'Robert',
      telephone: '683456789',
      email: 'robert.ashu@email.com',
      profession: 'Professeur Université',
      adresse: 'Mendong, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Ashu Grace',
      telephone: '676456789',
      relation: 'Mère'
    },
    medical: {
      allergies: ['Poussière'],
      medicaments: [],
      problemesSante: [],
      docteur: {
        nom: 'Dr. Njong Helen',
        telephone: '699777666'
      }
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Mathematics', note: 18.0, coefficient: 4, appreciation: 'Exceptional talent' },
        { nom: 'English Language', note: 17.5, coefficient: 4, appreciation: 'Excellent writing skills' },
        { nom: 'Science', note: 17.0, coefficient: 3, appreciation: 'Outstanding comprehension' },
        { nom: 'Social Studies', note: 16.5, coefficient: 2, appreciation: 'Great analytical skills' },
        { nom: 'Physical Education', note: 15.0, coefficient: 1, appreciation: 'Good participation' },
      ],
      moyenneGenerale: 17.3,
      rang: 1,
      effectif: 26,
      appreciation: 'Outstanding student, top of the class. Keep up the excellent work!',
      mention: 'Excellent'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 5,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Science Fair', 'Student Council', 'Piano', 'Chess Club'],
    dateInscription: '2020-09-01',
    statut: 'actif'
  }
];

const STORAGE_KEY = 'students';

function getStudents(): Student[] {
  if (typeof window === 'undefined') return EXAMPLE_STUDENTS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EXAMPLE_STUDENTS));
    return EXAMPLE_STUDENTS;
  }
  return JSON.parse(data);
}

function saveStudents(students: Student[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function addStudent(student: Student) {
  const students = getStudents();
  students.push(student);
  saveStudents(students);
}

function updateStudent(id: string, updated: Partial<Student>) {
  const students = getStudents();
  const idx = students.findIndex((s) => s.id === id);
  if (idx !== -1) {
    students[idx] = { ...students[idx], ...updated };
    saveStudents(students);
  }
}

function deleteStudent(id: string) {
  const students = getStudents().filter((s) => s.id !== id);
  saveStudents(students);
}

export {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};