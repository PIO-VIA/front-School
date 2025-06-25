// Données enrichies pour 30 enseignants camerounais
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
    competencePedagogique: number;
    relationEleves: number;
    ponctualite: number;
    innovation: number;
    travailEquipe: number;
    commentaires: string;
    dateDerniereEvaluation: string;
  };
  formation: {
    nom: string;
    organisme: string;
    date: string;
    duree: number;
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
      commentaires: 'Enseignant exemplaire, très apprécié des élèves et collègues.',
      dateDerniereEvaluation: '2024-05-15'
    },
    formation: [
      {
        nom: 'Pédagogie Numérique',
        organisme: 'Institut Français du Cameroun',
        date: '2023-07-15',
        duree: 40,
        certificat: true
      }
    ],
    responsabilites: ['Coordinateur Pédagogique', 'Responsable des Mathématiques'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true, heuresSupplementaires: 2 },
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
        description: 'Enseignement du français et histoire-géographie'
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
      commentaires: 'Enseignante dévouée avec une excellente maîtrise.',
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
    responsabilites: ['Responsable Bibliothèque', 'Animation Culturelle'],
    historiquePresence: [
      { date: '2024-06-24', present: false, excuse: 'Maladie' },
      { date: '2024-06-25', present: true },
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
      }
    ],
    experience: [
      {
        poste: 'Senior Primary Teacher',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2012-09-01',
        description: 'English language instruction, curriculum development'
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
      commentaires: 'Outstanding teacher with excellent English skills.',
      dateDerniereEvaluation: '2024-03-25'
    },
    formation: [
      {
        nom: 'Modern English Teaching Methods',
        organisme: 'British Council Cameroon',
        date: '2023-06-05',
        duree: 48,
        certificat: true
      }
    ],
    responsabilites: ['Anglophone Section Coordinator', 'English Department Head'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
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
        description: 'Enseignement sciences et initiation informatique'
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
      commentaires: 'Très compétent en sciences et informatique.',
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
    responsabilites: ['Responsable Informatique', 'Laboratoire Sciences'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
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
      }
    ],
    experience: [
      {
        poste: 'Institutrice',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2014-09-01',
        description: 'Enseignement français et éducation civique'
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
      commentaires: 'Enseignante bienveillante, très proche des élèves.',
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
    responsabilites: ['Suivi Pédagogique Individualisé'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    congesRestants: 22,
    statut: 'actif',
    urgence: {
      nom: 'Bomda Jean',
      telephone: '699223344',
      relation: 'Époux'
    },
    dateEmbauche: '2014-09-01'
  },
  {
    id: '6',
    nom: 'Ngono',
    prenom: 'Célestine',
    sexe: 'F',
    dateNaissance: '1979-04-15',
    lieuNaissance: 'Ebolowa, Cameroun',
    telephone: '697445566',
    email: 'c.ngono@excellence-school.cm',
    adresse: 'Nlongkak, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c24976bb?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '445566778',
    matieres: ['Lecture', 'Écriture'],
    classes: ['CP'],
    section: 'Francophone',
    diplomes: [
      {
        titre: 'DIPES I',
        institution: 'École Normale d\'Instituteurs de Yaoundé',
        annee: 2002
      }
    ],
    experience: [
      {
        poste: 'Institutrice CP',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2007-09-01',
        description: 'Enseignement en cours préparatoire'
      }
    ],
    salaire: {
      base: 160000,
      primes: [
        { nom: 'Prime d\'ancienneté', montant: 18000 }
      ],
      total: 178000
    },
    contrat: {
      type: 'CDI',
      debut: '2007-09-01',
      heuresParSemaine: 25
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 5,
      ponctualite: 4,
      innovation: 4,
      travailEquipe: 4,
      commentaires: 'Excellente avec les tout-petits, très patiente.',
      dateDerniereEvaluation: '2024-03-10'
    },
    formation: [
      {
        nom: 'Pédagogie Montessori',
        organisme: 'Centre de Formation Yaoundé',
        date: '2023-04-15',
        duree: 60,
        certificat: true
      }
    ],
    responsabilites: ['Coordinatrice CP', 'Matériel Pédagogique'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    congesRestants: 15,
    statut: 'actif',
    urgence: {
      nom: 'Ngono Pierre',
      telephone: '678445566',
      relation: 'Époux'
    },
    dateEmbauche: '2007-09-01'
  },
  {
    id: '7',
    nom: 'Mbua',
    prenom: 'Alice',
    sexe: 'F',
    dateNaissance: '1983-12-22',
    lieuNaissance: 'Kumba, Cameroun',
    telephone: '694556677',
    email: 'a.mbua@excellence-school.cm',
    adresse: 'Bonanjo, Douala',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '556677889',
    matieres: ['Mathematics', 'Science'],
    classes: ['Class 4', 'Class 5'],
    section: 'Anglophone',
    diplomes: [
      {
        titre: 'Bachelor of Science in Mathematics',
        institution: 'University of Buea',
        annee: 2007
      },
      {
        titre: 'Diploma in Primary Education',
        institution: 'Teacher Training College Kumba',
        annee: 2009
      }
    ],
    experience: [
      {
        poste: 'Senior Teacher',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2013-09-01',
        description: 'Teaching Mathematics and Science to upper primary'
      }
    ],
    salaire: {
      base: 175000,
      primes: [
        { nom: 'Science bonus', montant: 12000 },
        { nom: 'Performance bonus', montant: 8000 }
      ],
      total: 195000
    },
    contrat: {
      type: 'CDI',
      debut: '2013-09-01',
      heuresParSemaine: 22
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 4,
      ponctualite: 5,
      innovation: 4,
      travailEquipe: 5,
      commentaires: 'Excellent mathematics teacher, very methodical.',
      dateDerniereEvaluation: '2024-04-05'
    },
    formation: [
      {
        nom: 'Advanced Mathematics Pedagogy',
        organisme: 'Cambridge Assessment',
        date: '2023-08-20',
        duree: 40,
        certificat: true
      }
    ],
    responsabilites: ['Mathematics Coordinator', 'Academic Committee'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true, heuresSupplementaires: 1 },
    ],
    congesRestants: 20,
    statut: 'actif',
    urgence: {
      nom: 'Mbua James',
      telephone: '675556677',
      relation: 'Husband'
    },
    dateEmbauche: '2013-09-01'
  },
  {
    id: '8',
    nom: 'Njong',
    prenom: 'Martin',
    sexe: 'M',
    dateNaissance: '1981-08-30',
    lieuNaissance: 'Limbe, Cameroun',
    telephone: '698776655',
    email: 'm.njong@excellence-school.cm',
    adresse: 'Mile 17, Douala',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '776655443',
    matieres: ['Social Studies', 'Physical Education'],
    classes: ['Class 2', 'Class 3'],
    section: 'Anglophone',
    diplomes: [
      {
        titre: 'Bachelor of Arts in History',
        institution: 'University of Bamenda',
        annee: 2005
      }
    ],
    experience: [
      {
        poste: 'Primary Teacher',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2015-09-01',
        description: 'Teaching Social Studies and Physical Education'
      }
    ],
    salaire: {
      base: 150000,
      primes: [
        { nom: 'Sports activities bonus', montant: 10000 }
      ],
      total: 160000
    },
    contrat: {
      type: 'CDI',
      debut: '2015-09-01',
      heuresParSemaine: 20
    },
    evaluation: {
      competencePedagogique: 4,
      relationEleves: 5,
      ponctualite: 4,
      innovation: 3,
      travailEquipe: 4,
      commentaires: 'Very good with sports activities, students love his classes.',
      dateDerniereEvaluation: '2024-02-20'
    },
    formation: [
      {
        nom: 'Sports Coaching Certification',
        organisme: 'Cameroon Football Federation',
        date: '2023-11-10',
        duree: 24,
        certificat: true
      }
    ],
    responsabilites: ['Sports Coordinator', 'Playground Safety'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false, excuse: 'Sports tournament' },
    ],
    congesRestants: 18,
    statut: 'actif',
    urgence: {
      nom: 'Njong Helen',
      telephone: '679776655',
      relation: 'Wife'
    },
    dateEmbauche: '2015-09-01'
  },
  {
    id: '9',
    nom: 'Ayuk',
    prenom: 'Helen',
    sexe: 'F',
    dateNaissance: '1986-06-14',
    lieuNaissance: 'Buea, Cameroun',
    telephone: '692887799',
    email: 'h.ayuk@excellence-school.cm',
    adresse: 'New Bell, Douala',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '887799001',
    matieres: ['Arts', 'Music'],
    classes: ['Class 1', 'Class 2', 'Class 3'],
    section: 'Anglophone',
    diplomes: [
      {
        titre: 'Bachelor of Fine Arts',
        institution: 'University of Dschang',
        annee: 2009
      }
    ],
    experience: [
      {
        poste: 'Arts Teacher',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2016-09-01',
        description: 'Teaching Arts and Music to primary classes'
      }
    ],
    salaire: {
      base: 140000,
      primes: [
        { nom: 'Creative arts bonus', montant: 5000 }
      ],
      total: 145000
    },
    contrat: {
      type: 'CDI',
      debut: '2016-09-01',
      heuresParSemaine: 15
    },
    evaluation: {
      competencePedagogique: 4,
      relationEleves: 5,
      ponctualite: 4,
      innovation: 5,
      travailEquipe: 4,
      commentaires: 'Very creative teacher, brings out artistic talents in students.',
      dateDerniereEvaluation: '2024-01-15'
    },
    formation: [
      {
        nom: 'Creative Arts in Education',
        organisme: 'Goethe Institut Kamerun',
        date: '2023-07-25',
        duree: 30,
        certificat: true
      }
    ],
    responsabilites: ['Arts Club', 'School Decorations'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    congesRestants: 24,
    statut: 'actif',
    urgence: {
      nom: 'Ayuk Charles',
      telephone: '677887799',
      relation: 'Brother'
    },
    dateEmbauche: '2016-09-01'
  },
  {
    id: '10',
    nom: 'Ashu',
    prenom: 'Robert',
    sexe: 'M',
    dateNaissance: '1977-10-05',
    lieuNaissance: 'Bamenda, Cameroun',
    telephone: '685998877',
    email: 'r.ashu@excellence-school.cm',
    adresse: 'Santa Barbara, Yaoundé',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    numeroIdentite: '998877665',
    matieres: ['Mathematics', 'Science'],
    classes: ['Class 4', 'Class 5'],
    section: 'Anglophone',
    diplomes: [
      {
        titre: 'Master in Mathematics Education',
        institution: 'University of Yaoundé I',
        annee: 2003
      },
      {
        titre: 'DIPES II',
        institution: 'Higher Teacher Training College Yaoundé',
        annee: 2005
      }
    ],
    experience: [
      {
        poste: 'Head of Mathematics Department',
        etablissement: 'École Primaire Bilingue Excellence',
        debut: '2009-09-01',
        description: 'Mathematics instruction and curriculum development'
      }
    ],
    salaire: {
      base: 185000,
      primes: [
        { nom: 'Department head bonus', montant: 20000 },
        { nom: 'Master\'s degree bonus', montant: 15000 }
      ],
      total: 220000
    },
    contrat: {
      type: 'CDI',
      debut: '2009-09-01',
      heuresParSemaine: 24
    },
    evaluation: {
      competencePedagogique: 5,
      relationEleves: 4,
      ponctualite: 5,
      innovation: 5,
      travailEquipe: 5,
      commentaires: 'Outstanding mathematics teacher and department leader.',
      dateDerniereEvaluation: '2024-05-01'
    },
    formation: [
      {
        nom: 'Advanced Mathematics Curriculum',
        organisme: 'UNESCO Education',
        date: '2023-09-15',
        duree: 50,
        certificat: true
      }
    ],
    responsabilites: ['Mathematics Department Head', 'Curriculum Committee Chair'],
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    congesRestants: 16,
    statut: 'actif',
    urgence: {
      nom: 'Ashu Grace',
      telephone: '676998877',
      relation: 'Wife'
    },
    dateEmbauche: '2009-09-01'
  }
];

// Fonction pour générer les 20 enseignants supplémentaires
function generateAdditionalTeachers(): Teacher[] {
  const noms = [
    'Kamga', 'Fokou', 'Ndongo', 'Mimbang', 'Ekane', 'Manga', 'Ndoumou', 'Tchiegang',
    'Yemba', 'Nkomo', 'Abanda', 'Onana', 'Mvouma', 'Eteme', 'Biyong', 'Ngo',
    'Awono', 'Mbarga', 'Olinga', 'Ze', 'Mba', 'Owona', 'Eboule', 'Okenve'
  ];
  
  const prenoms = {
    M: ['Patrick', 'Michel', 'Claude', 'Alain', 'Roger', 'Francis', 'Gérard', 'Nicolas', 'Eric', 'Daniel'],
    F: ['Marie', 'Anne', 'Christine', 'Françoise', 'Sylvie', 'Catherine', 'Monique', 'Brigitte', 'Nicole', 'Martine']
  };
  
  const prenomsAnglo = {
    M: ['Michael', 'David', 'James', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles'],
    F: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica']
  };

  const villes = ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam', 'Garoua', 'Maroua', 'Bertoua', 'Ebolowa'];
  const quartiers = ['Bastos', 'Mvan', 'Essos', 'Mendong', 'Nlongkak', 'Omnisport', 'Mfandena', 'Tsinga'];
  
  const matieresFranco = [
    ['Français', 'Éducation Civique'],
    ['Mathématiques', 'Sciences'],
    ['Histoire-Géographie', 'Français'],
    ['Sciences d\'Observation', 'Mathématiques'],
    ['Éducation Physique', 'Arts Plastiques'],
    ['Musique', 'Arts Plastiques']
  ];
  
  const matieresAnglo = [
    ['English Language', 'Literature'],
    ['Mathematics', 'Science'],
    ['Social Studies', 'Civic Education'],
    ['Physical Education', 'Health'],
    ['Arts', 'Music']
  ];

  const additionalTeachers: Teacher[] = [];

  for (let i = 11; i <= 30; i++) {
    const sexe = Math.random() > 0.5 ? 'M' : 'F';
    const section = Math.random() > 0.6 ? 'Francophone' : 'Anglophone';
    
    const nom = noms[Math.floor(Math.random() * noms.length)];
    const prenom = section === 'Francophone' 
      ? prenoms[sexe][Math.floor(Math.random() * prenoms[sexe].length)]
      : prenomsAnglo[sexe][Math.floor(Math.random() * prenomsAnglo[sexe].length)];

    const ville = villes[Math.floor(Math.random() * villes.length)];
    const quartier = quartiers[Math.floor(Math.random() * quartiers.length)];
    
    const matieres = section === 'Francophone' 
      ? matieresFranco[Math.floor(Math.random() * matieresFranco.length)]
      : matieresAnglo[Math.floor(Math.random() * matieresAnglo.length)];

    const classes = section === 'Francophone' 
      ? ['CP', 'CE1', 'CE2', 'CM1', 'CM2'].slice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) + 2)
      : ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].slice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) + 2);

    // Générer une date de naissance entre 1970 et 1990
    const year = Math.floor(Math.random() * 20) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    // Générer une date d'embauche entre 2005 et 2020
    const embaucheYear = Math.floor(Math.random() * 15) + 2005;

    const salaireBase = Math.floor(Math.random() * 50000) + 120000;
    const primes = Math.random() > 0.5 ? [
      { nom: 'Prime d\'ancienneté', montant: Math.floor(Math.random() * 20000) + 5000 }
    ] : [];

    const teacher: Teacher = {
      id: i.toString(),
      nom,
      prenom,
      sexe,
      dateNaissance: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      lieuNaissance: `${ville}, Cameroun`,
      telephone: `69${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000 + 100000)}`,
      email: `${prenom.toLowerCase()}.${nom.toLowerCase()}@excellence-school.cm`,
      adresse: `${quartier}, ${ville}`,
      photo: `https://images.unsplash.com/photo-${sexe === 'M' ? '1472099645785-5658abf4ff4e' : '1580489944761-15a19d654956'}?w=150&h=150&fit=crop&crop=face`,
      numeroIdentite: Math.floor(Math.random() * 900000000 + 100000000).toString(),
      matieres,
      classes,
      section,
      diplomes: [
        {
          titre: section === 'Francophone' ? 'Licence' : 'Bachelor',
          institution: `Université de ${ville}`,
          annee: year + 25
        }
      ],
      experience: [
        {
          poste: 'Enseignant',
          etablissement: 'École Primaire Bilingue Excellence',
          debut: `${embaucheYear}-09-01`,
          description: `Enseignement de ${matieres.join(' et ')}`
        }
      ],
      salaire: {
        base: salaireBase,
        primes,
        total: salaireBase + primes.reduce((sum, p) => sum + p.montant, 0)
      },
      contrat: {
        type: 'CDI',
        debut: `${embaucheYear}-09-01`,
        heuresParSemaine: Math.floor(Math.random() * 10) + 15
      },
      evaluation: {
        competencePedagogique: Math.floor(Math.random() * 2) + 4,
        relationEleves: Math.floor(Math.random() * 2) + 4,
        ponctualite: Math.floor(Math.random() * 2) + 4,
        innovation: Math.floor(Math.random() * 2) + 3,
        travailEquipe: Math.floor(Math.random() * 2) + 4,
        commentaires: 'Bon enseignant, travail satisfaisant.',
        dateDerniereEvaluation: '2024-03-15'
      },
      formation: [
        {
          nom: 'Formation Pédagogique',
          organisme: 'Ministère de l\'Éducation',
          date: '2023-06-15',
          duree: 30,
          certificat: true
        }
      ],
      responsabilites: ['Enseignement'],
      historiquePresence: [
        { date: '2024-06-24', present: Math.random() > 0.1 },
        { date: '2024-06-25', present: Math.random() > 0.1 },
      ],
      congesRestants: Math.floor(Math.random() * 20) + 10,
      statut: 'actif',
      urgence: {
        nom: `${nom} ${sexe === 'M' ? 'Marie' : 'Jean'}`,
        telephone: `67${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000 + 100000)}`,
        relation: Math.random() > 0.5 ? 'Époux' : 'Épouse'
      },
      dateEmbauche: `${embaucheYear}-09-01`
    };

    additionalTeachers.push(teacher);
  }

  return additionalTeachers;
}

// Fusionner tous les enseignants
const ALL_TEACHERS = [...EXAMPLE_TEACHERS, ...generateAdditionalTeachers()];

const STORAGE_KEY = 'teachers';

function getTeachers(): Teacher[] {
  if (typeof window === 'undefined') return ALL_TEACHERS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_TEACHERS));
    return ALL_TEACHERS;
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