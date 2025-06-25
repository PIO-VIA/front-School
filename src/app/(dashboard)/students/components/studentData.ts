// Données simulées pour les élèves (inspirées du Cameroun)
export type Student = {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  dateNaissance: string;
  section: string;
  classe: string;
  adresse: string;
  telephone: string;
  historiquePresence: PresenceRecord[];
  bulletin: Bulletin;
};

export type PresenceRecord = {
  date: string;
  present: boolean;
};

export type Bulletin = {
  annee: string;
  matieres: {
    nom: string;
    note: number;
  }[];
};

const EXAMPLE_STUDENTS: Student[] = [
  {
    id: '1',
    nom: 'Mbiya',
    prenom: 'Brice',
    sexe: 'M',
    dateNaissance: '2012-03-15',
    section: 'Francophone',
    classe: 'CM2',
    adresse: 'Bastos, Yaoundé',
    telephone: '690123456',
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false },
    ],
    bulletin: {
      annee: '2023-2024',
      matieres: [
        { nom: 'Mathématiques', note: 15 },
        { nom: 'Français', note: 14 },
        { nom: 'Anglais', note: 13 },
        { nom: 'Éducation Civique', note: 16 },
      ],
    },
  },
  {
    id: '2',
    nom: 'Ngono',
    prenom: 'Aminatou',
    sexe: 'F',
    dateNaissance: '2011-11-02',
    section: 'Anglophone',
    classe: 'Class 6',
    adresse: 'Bonamoussadi, Douala',
    telephone: '677654321',
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      matieres: [
        { nom: 'Mathematics', note: 17 },
        { nom: 'English', note: 16 },
        { nom: 'Science', note: 15 },
        { nom: 'Civic Education', note: 18 },
      ],
    },
  },
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