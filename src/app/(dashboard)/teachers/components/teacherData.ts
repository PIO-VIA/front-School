// Données enrichies pour les enseignants (inspirées du Cameroun)
export type Teacher = {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  dateNaissance: string;
  lieuNaissance: string;
  telephone: string;
  email: string;
  adresse: string;
  photo?: string;
  numeroIdentite: string;
  matieres: string[];
  classes: string[];
  section: string;
  diplomes: {
    titre: string;
    institution: string;
    annee: number;
    specialisation?: string;
  }[];
  experience: {
    poste: string;
    etablissement: string;
    debut: string;
    fin?: string;
    description: string;
  }[];
  salaire: {
    base: number;
    primes: { nom: string; montant: number }[];
    total: number;
  };
  contrat: {
    type: 'CDI' | 'CDD' | 'Vacataire';
    debut: string;
    fin?: string;
    heuresParSemaine: number;
  };
  evaluation: {
    competencePedagogique: number; // sur 5
    relationEleves: number; // sur 5
    ponctualite: number; // sur 5
    innovation: number; // sur 5
    travailEquipe: number; // sur 5
    commentaires: string;
    dateDerniereEvaluation: string;
  };
  formation: {
    nom: string;
    organisme: string;
    date: string;
    duree: number; // en heures
    certificat: boolean;
  }[];
  responsabilites: string[];
  historiquePresence: PresenceRecord[];
  congesRestants: number;
  statut: 'actif' | 'conge' | 'suspendu' | 'demission';
  urgence: {
    nom: string;
    telephone: string;
    relation: string;
  };
  dateEmbauche: string;
};

export type PresenceRecord = {
  date: string;
  present: boolean;
  retard?: boolean;
  heuresSupplementaires?: number;
  excuse?: string;
};

const EXAMPLE_TEACHERS: Teacher[] = [
  {
    id: '1',
    nom: 'Essomba',
    prenom: 'Jean-Pierre',
    sexe: 'M',
    dateNaissance: '1980-05-12',
    lieuNaissance: 'Yaoundé, Cameroun',
    telephone: '699112233',
    email: 'jp.essomba@excellence-school.cm',
    adresse: 'Mokolo, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '123456789',
    matieres: ['Mathématiques', 'Sciences d\'Observation'],
    classes: ['CM1', 'CM2'],
    section: 'Francophone',
    diplomes: [
      {
        titre: 'Licence en Mathématiques',
        institution: 'Université de Yaoundé I',
        annee: 2004,
        specialisation: 'Mathématiques Appliquées'
      },
      {
        titre: 'DIPES II',
        institution: 'École Normale Supérieure de Yaoundé',
        annee: 2006,
        specialisation: 'Enseignement Secondaire'
      }
    ],
    experience: [
      {
        poste: 'Enseignant Principal',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2010-09-01',
        description: 'Enseignement des mathématiques et sciences, coordination pédagogique'
      },
      {
        poste: 'Enseignant',
        etablissement: 'Lycée de Ngousso',
        debut: '2006-09-01',
        fin: '2010-08-31',
        description: 'Enseignement des mathématiques au secondaire'
      }
    ],
    salaire: {
      base: 180000,
      primes: [
        { nom: 'Prime de responsabilité', montant: 25000 },
        { nom: 'Prime d\'ancienneté', montant: 15000 }
      ],
      total: 220000
    },
    contrat: {
      type: 'CDI',
      debut: '2010-09-01',
      heuresParSemaine: 24
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 4,
      ponctualite: 5,
      innovation: 4,
      travailEquipe: 5,
      commentaires: 'Enseignant exemplaire, très apprécié des élèves et collègues. Leadership naturel.',
      dateDerniereEvaluation: '2024-05-15'
    },
    formation: [
      {
        nom: 'Pédagogie Numérique',
        organisme: 'Institut Français du Cameroun',
        date: '2023-07-15',
        duree: 40,
        certificat: true
      },
      {
        nom: 'Gestion de Classe',
        organisme: 'Ministère de l\'Éducation',
        date: '2022-11-20',
        duree: 24,
        certificat: true
      }
    ],
    responsabilites: ['Coordinateur Pédagogique', 'Responsable des Mathématiques', 'Encadrement Stagiaires'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true, heuresSupplementaires: 2 },
      { date: '2024-06-26', present: false, excuse: 'Formation continue' },
      { date: '2024-06-27', present: true },
    ],
    congesRestants: 18,
    statut: 'actif',
    urgence: {
      nom: 'Essomba Marie Claire',
      telephone: '677112233',
      relation: 'Épouse'
    },
    dateEmbauche: '2010-09-01'
  },
  {
    id: '2',
    nom: 'Foning',
    prenom: 'Clarisse',
    sexe: 'F',
    dateNaissance: '1975-09-30',
    lieuNaissance: 'Bafoussam, Cameroun',
    telephone: '677998877',
    email: 'c.foning@excellence-school.cm',
    adresse: 'Mendong, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c24976bb?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '987654321',
    matieres: ['Français', 'Histoire-Géographie'],
    classes: ['CE2', 'CM1'],
    section: 'Francophone',
    diplomes: [
      {
        titre: 'Licence en Lettres Modernes',
        institution: 'Université de Dschang',
        annee: 1998,
        specialisation: 'Littérature Française'
      },
      {
        titre: 'DIPES I',
        institution: 'École Normale d\'Instituteurs de Foumban',
        annee: 2000
      }
    ],
    experience: [
      {
        poste: 'Institutrice Principale',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2005-09-01',
        description: 'Enseignement du français et histoire-géographie, responsable BCD'
      },
      {
        poste: 'Institutrice',
        etablissement: 'École Publique de Bafoussam',
        debut: '2000-09-01',
        fin: '2005-08-31',
        description: 'Enseignement en classes primaires'
      }
    ],
    salaire: {
      base: 165000,
      primes: [
        { nom: 'Prime de zone', montant: 10000 },
        { nom: 'Prime d\'ancienneté', montant: 20000 }
      ],
      total: 195000
    },
    contrat: {
      type: 'CDI',
      debut: '2005-09-01',
      heuresParSemaine: 22
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 5,
      ponctualite: 4,
      innovation: 4,
      travailEquipe: 4,
      commentaires: 'Enseignante dévouée avec une excellente maîtrise de sa matière. Très aimée des élèves.',
      dateDerniereEvaluation: '2024-04-20'
    },
    formation: [
      {
        nom: 'Méthodes d\'Enseignement du Français',
        organisme: 'IFADEM Cameroun',
        date: '2023-09-10',
        duree: 32,
        certificat: true
      }
    ],
    responsabilites: ['Responsable Bibliothèque', 'Animation Culturelle', 'Comité Pédagogique'],
    historiquePresence: [
      { date: '2024-06-24', present: false, excuse: 'Maladie' },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true },
    ],
    congesRestants: 12,
    statut: 'actif',
    urgence: {
      nom: 'Foning Paul',
      telephone: '699998877',
      relation: 'Époux'
    },
    dateEmbauche: '2005-09-01'
  },
  {
    id: '3',
    nom: 'Tabi',
    prenom: 'Grace',
    sexe: 'F',
    dateNaissance: '1985-03-18',
    lieuNaissance: 'Bamenda, Cameroun',
    telephone: '683445566',
    email: 'g.tabi@excellence-school.cm',
    adresse: 'Bastos, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '456789123',
    matieres: ['English Language', 'Literature'],
    classes: ['Class 1', 'Class 2', 'Class 3'],
    section: 'Anglophone',
    diplomes: [
      {
        titre: 'Bachelor in English Language and Literature',
        institution: 'University of Buea',
        annee: 2008,
        specialisation: 'Applied Linguistics'
      },
      {
        titre: 'Diploma in Primary Education',
        institution: 'Government Teachers Training College Kumba',
        annee: 2010
      }
    ],
    experience: [
      {
        poste: 'Senior Primary Teacher',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2012-09-01',
        description: 'English language instruction, curriculum development for Anglophone section'
      },
      {
        poste: 'Primary Teacher',
        etablissement: 'Presbyterian Primary School Bamenda',
        debut: '2010-09-01',
        fin: '2012-08-31',
        description: 'Teaching English and basic subjects in primary classes'
      }
    ],
    salaire: {
      base: 170000,
      primes: [
        { nom: 'Bilingual bonus', montant: 15000 },
        { nom: 'Performance bonus', montant: 10000 }
      ],
      total: 195000
    },
    contrat: {
      type: 'CDI',
      debut: '2012-09-01',
      heuresParSemaine: 20
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 5,
      ponctualite: 5,
      innovation: 5,
      travailEquipe: 4,
      commentaires: 'Outstanding teacher with excellent English skills. Great at motivating students.',
      dateDerniereEvaluation: '2024-03-25'
    },
    formation: [
      {
        nom: 'Modern English Teaching Methods',
        organisme: 'British Council Cameroon',
        date: '2023-06-05',
        duree: 48,
        certificat: true
      },
      {
        nom: 'Child Psychology in Education',
        organisme: 'University of Yaoundé I',
        date: '2023-01-15',
        duree: 30,
        certificat: true
      }
    ],
    responsabilites: ['Anglophone Section Coordinator', 'English Department Head', 'Parent-Teacher Liaison'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true, heuresSupplementaires: 1 },
    ],
    congesRestants: 25,
    statut: 'actif',
    urgence: {
      nom: 'Tabi John',
      telephone: '677445566',
      relation: 'Husband'
    },
    dateEmbauche: '2012-09-01'
  },
  {
    id: '4',
    nom: 'Takougang',
    prenom: 'Paul',
    sexe: 'M',
    dateNaissance: '1978-11-25',
    lieuNaissance: 'Bafia, Cameroun',
    telephone: '696334455',
    email: 'p.takougang@excellence-school.cm',
    adresse: 'Mfandena, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '789123456',
    matieres: ['Sciences d\'Observation', 'Informatique'],
    classes: ['CM1', 'CM2'],
    section: 'Francophone',
    diplomes: [
      {
        titre: 'Licence en Sciences Naturelles',
        institution: 'Université de Yaoundé I',
        annee: 2003,
        specialisation: 'Biologie'
      },
      {
        titre: 'Certificat en Informatique',
        institution: 'Institut SIANTOU',
        annee: 2008
      }
    ],
    experience: [
      {
        poste: 'Enseignant Sciences et Informatique',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2008-09-01',
        description: 'Enseignement sciences et initiation informatique, gestion du laboratoire'
      }
    ],
    salaire: {
      base: 155000,
      primes: [
        { nom: 'Prime technique', montant: 20000 },
        { nom: 'Prime d\'ancienneté', montant: 12000 }
      ],
      total: 187000
    },
    contrat: {
      type: 'CDI',
      debut: '2008-09-01',
      heuresParSemaine: 18
    },
    evaluation: {
      competencePedagogique: 4,
      relationEleves: 4,
      ponctualite: 5,
      innovation: 5,
      travailEquipe: 4,
      commentaires: 'Très compétent en sciences et informatique. Apporte une dimension technique importante.',
      dateDerniereEvaluation: '2024-02-10'
    },
    formation: [
      {
        nom: 'Robotique Éducative',
        organisme: 'Camtel Academy',
        date: '2023-10-12',
        duree: 36,
        certificat: true
      }
    ],
    responsabilites: ['Responsable Informatique', 'Laboratoire Sciences', 'Maintenance Équipements'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true },
      { date: '2024-06-27', present: true },
    ],
    congesRestants: 20,
    statut: 'actif',
    urgence: {
      nom: 'Takougang Sylvie',
      telephone: '678334455',
      relation: 'Épouse'
    },
    dateEmbauche: '2008-09-01'
  },
  {
    id: '5',
    nom: 'Bomda',
    prenom: 'Victoire',
    sexe: 'F',
    dateNaissance: '1982-07-08',
    lieuNaissance: 'Douala, Cameroun',
    telephone: '675223344',
    email: 'v.bomda@excellence-school.cm',
    adresse: 'Emana, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '321654987',
    matieres: ['Français', 'Éducation Civique'],
    classes: ['CE1', 'CE2'],
    section: 'Francophone',
    diplomes: [
      {
        titre: 'Licence en Lettres Bilingues',
        institution: 'Université de Douala',
        annee: 2006,
        specialisation: 'Français-Anglais'
      },
      {
        titre: 'DIPES I',
        institution: 'École Normale d\'Instituteurs de Yaoundé',
        annee: 2008
      }
    ],
    experience: [
      {
        poste: 'Institutrice',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2014-09-01',
        description: 'Enseignement français et éducation civique, suivi pédagogique des élèves'
      },
      {
        poste: 'Institutrice Stagiaire',
        etablissement: 'École Publique d\'Akwa',
        debut: '2008-09-01',
        fin: '2014-08-31',
        description: 'Enseignement en classes primaires, perfectionnement pédagogique'
      }
    ],
    salaire: {
      base: 145000,
      primes: [
        { nom: 'Prime d\'encadrement', montant: 8000 }
      ],
      total: 153000
    },
    contrat: {
      type: 'CDI',
      debut: '2014-09-01',
      heuresParSemaine: 20
    },
    evaluation: {
      competencePedagogique: 4,
      relationEleves: 5,
      ponctualite: 4,
      innovation: 3,
      travailEquipe: 5,
      commentaires: 'Enseignante bienveillante, très proche des élèves. Excellente dans l\'accompagnement.',
      dateDerniereEvaluation: '2024-01-30'
    },
    formation: [
      {
        nom: 'Gestion des Difficultés d\'Apprentissage',
        organisme: 'ONG Plan Cameroun',
        date: '2023-05-20',
        duree: 28,
        certificat: true
      }
    ],
    responsabilites: ['Suivi Pédagogique Individualisé', 'Relations Parents-École'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
      { date: '2024-06-26', present: true, retard: true },
      { date: '2024-06-27', present: true },
    ],
    congesRestants: 22,
    statut: 'actif',
    urgence: {
      nom: 'Bomda Jean',
      telephone: '699223344',
      relation: 'Époux'
    },
    dateEmbauche: '2014-09-01'
  }
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