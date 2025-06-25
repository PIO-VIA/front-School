// Données simulées pour les enseignants (inspirées du Cameroun)
export type Teacher = {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  dateNaissance: string;
  telephone: string;
  adresse: string;
  matieres: string[];
  historiquePresence: PresenceRecord[];
};

export type PresenceRecord = {
  date: string;
  present: boolean;
};

const EXAMPLE_TEACHERS: Teacher[] = [
  {
    id: '1',
    nom: 'Essomba',
    prenom: 'Jean-Pierre',
    sexe: 'M',
    dateNaissance: '1980-05-12',
    telephone: '699112233',
    adresse: 'Mokolo, Yaoundé',
    matieres: ['Mathématiques', 'Sciences'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
  },
  {
    id: '2',
    nom: 'Foning',
    prenom: 'Clarisse',
    sexe: 'F',
    dateNaissance: '1975-09-30',
    telephone: '677998877',
    adresse: 'Akwa, Douala',
    matieres: ['Français', 'Histoire-Géographie'],
    historiquePresence: [
      { date: '2024-06-24', present: false },
      { date: '2024-06-25', present: true },
    ],
  },
];

const STORAGE_KEY = 'teachers';

function getTeachers(): Teacher[] {
  if (typeof window === 'undefined') return EXAMPLE_TEACHERS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(EXAMPLE_TEACHERS));
    return EXAMPLE_TEACHERS;
  }
  return JSON.parse(data);
}

function saveTeachers(teachers: Teacher[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
}

function addTeacher(teacher: Teacher) {
  const teachers = getTeachers();
  teachers.push(teacher);
  saveTeachers(teachers);
}

function updateTeacher(id: string, updated: Partial<Teacher>) {
  const teachers = getTeachers();
  const idx = teachers.findIndex((t) => t.id === id);
  if (idx !== -1) {
    teachers[idx] = { ...teachers[idx], ...updated };
    saveTeachers(teachers);
  }
}

function deleteTeacher(id: string) {
  const teachers = getTeachers().filter((t) => t.id !== id);
  saveTeachers(teachers);
}

export {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
}; 