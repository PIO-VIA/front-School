// Données simulées pour les salles (inspirées du Cameroun)
export type Classroom = {
  id: string;
  nom: string;
  capacite: number;
  localisation: string;
  description?: string;
};

const EXAMPLE_CLASSROOMS: Classroom[] = [
  {
    id: '1',
    nom: 'Salle A',
    capacite: 40,
    localisation: 'Bâtiment Principal, Rez-de-chaussée',
    description: 'Salle lumineuse, ventilée',
  },
  {
    id: '2',
    nom: 'Salle Informatique',
    capacite: 25,
    localisation: 'Bloc B, 1er étage',
    description: 'Équipée de 25 ordinateurs',
  },
  {
    id: '3',
    nom: 'Salle Polyvalente',
    capacite: 60,
    localisation: 'Annexe',
    description: 'Utilisée pour les réunions et activités',
  },
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