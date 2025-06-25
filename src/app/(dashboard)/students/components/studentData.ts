// Données enrichies pour 70 élèves camerounais
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
    relation: string;
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
    discipline: number;
    participation: number;
    travailEquipe: number;
    ponctualite: number;
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
  // Section Francophone - CP
  {
    id: '1',
    nom: 'Mbiya',
    prenom: 'Brice',
    sexe: 'M',
    dateNaissance: '2017-03-15',
    lieuNaissance: 'Yaoundé, Cameroun',
    section: 'Francophone',
    classe: 'CP',
    adresse: 'Bastos, Yaoundé',
    telephone: '690123456',
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
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false, excuse: 'Maladie' },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Lecture', note: 15.5, coefficient: 4, appreciation: 'Bon déchiffrage' },
        { nom: 'Écriture', note: 14.0, coefficient: 3, appreciation: 'Améliorer la tenue du crayon' },
        { nom: 'Calcul', note: 16.0, coefficient: 4, appreciation: 'Très bon en nombres' },
        { nom: 'Éducation Civique', note: 18.0, coefficient: 2, appreciation: 'Excellent comportement' },
      ],
      moyenneGenerale: 15.2,
      rang: 3,
      effectif: 25,
      appreciation: 'Élève sérieux et appliqué.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 4,
      travailEquipe: 5,
      ponctualite: 3
    },
    activitesExtrascolaires: ['Jeux éducatifs', 'Dessin'],
    dateInscription: '2023-09-01',
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Kouam',
    prenom: 'Fanta',
    sexe: 'F',
    dateNaissance: '2017-05-10',
    lieuNaissance: 'Garoua, Cameroun',
    section: 'Francophone',
    classe: 'CP',
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
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Lecture', note: 17.0, coefficient: 4, appreciation: 'Excellente lectrice' },
        { nom: 'Écriture', note: 16.5, coefficient: 3, appreciation: 'Belle écriture' },
        { nom: 'Calcul', note: 18.0, coefficient: 4, appreciation: 'Très douée en calcul' },
        { nom: 'Éducation Civique', note: 17.5, coefficient: 2, appreciation: 'Modèle de comportement' },
      ],
      moyenneGenerale: 17.1,
      rang: 1,
      effectif: 25,
      appreciation: 'Excellente élève, très motivée.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 5,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Lecture', 'Chant'],
    dateInscription: '2023-09-01',
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Foning',
    prenom: 'Kevin',
    sexe: 'M',
    dateNaissance: '2017-08-20',
    lieuNaissance: 'Bafoussam, Cameroun',
    section: 'Francophone',
    classe: 'CP',
    adresse: 'Mvan, Yaoundé',
    telephone: '699887766',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Foning',
      prenom: 'Paul',
      telephone: '699887766',
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
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Lecture', note: 12.0, coefficient: 4, appreciation: 'Progrès en cours' },
        { nom: 'Écriture', note: 13.5, coefficient: 3, appreciation: 'S\'applique bien' },
        { nom: 'Calcul', note: 14.0, coefficient: 4, appreciation: 'Comprend bien' },
        { nom: 'Éducation Civique', note: 16.0, coefficient: 2, appreciation: 'Très sage' },
      ],
      moyenneGenerale: 13.2,
      rang: 15,
      effectif: 25,
      appreciation: 'Élève en progrès, continuer les efforts.',
      mention: 'Assez Bien'
    },
    comportement: {
      discipline: 4,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Dessin', 'Jeux'],
    dateInscription: '2023-09-01',
    statut: 'actif'
  },
  
  // Section Francophone - CE1
  {
    id: '4',
    nom: 'Tchouta',
    prenom: 'Divine',
    sexe: 'F',
    dateNaissance: '2016-04-12',
    lieuNaissance: 'Douala, Cameroun',
    section: 'Francophone',
    classe: 'CE1',
    adresse: 'Akwa, Douala',
    telephone: '677445566',
    photo: 'https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Tchouta',
      prenom: 'Bernard',
      telephone: '677445566',
      profession: 'Commerçant',
      adresse: 'Akwa, Douala',
      relation: 'Père'
    },
    urgence: {
      nom: 'Tchouta Rose',
      telephone: '699445566',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 16.0, coefficient: 4, appreciation: 'Excellent niveau' },
        { nom: 'Mathématiques', note: 15.5, coefficient: 4, appreciation: 'Très bonne en calcul' },
        { nom: 'Éducation Civique', note: 17.0, coefficient: 2, appreciation: 'Exemplaire' },
        { nom: 'Sciences', note: 14.5, coefficient: 2, appreciation: 'Curieuse et attentive' },
      ],
      moyenneGenerale: 15.6,
      rang: 2,
      effectif: 28,
      appreciation: 'Excellente élève, continue ainsi.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 4,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Lecture', 'Danse'],
    dateInscription: '2022-09-01',
    statut: 'actif'
  },
  {
    id: '5',
    nom: 'Ngono',
    prenom: 'Samuel',
    sexe: 'M',
    dateNaissance: '2016-09-18',
    lieuNaissance: 'Bertoua, Cameroun',
    section: 'Francophone',
    classe: 'CE1',
    adresse: 'Mvog-Ada, Yaoundé',
    telephone: '683778899',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ngono',
      prenom: 'Pierre',
      telephone: '683778899',
      profession: 'Chauffeur',
      adresse: 'Mvog-Ada, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Ngono Elisabeth',
      telephone: '678778899',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false, excuse: 'Rendez-vous médical' },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 13.0, coefficient: 4, appreciation: 'Bon niveau de lecture' },
        { nom: 'Mathématiques', note: 14.5, coefficient: 4, appreciation: 'Bon en calcul mental' },
        { nom: 'Éducation Civique', note: 15.0, coefficient: 2, appreciation: 'Bon comportement' },
        { nom: 'Sciences', note: 13.5, coefficient: 2, appreciation: 'Participe bien' },
      ],
      moyenneGenerale: 13.8,
      rang: 12,
      effectif: 28,
      appreciation: 'Bon élève, peut encore progresser.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 4,
      travailEquipe: 4,
      ponctualite: 3
    },
    activitesExtrascolaires: ['Football', 'Musique'],
    dateInscription: '2022-09-01',
    statut: 'actif'
  },

  // Section Francophone - CE2
  {
    id: '6',
    nom: 'Essama',
    prenom: 'Grace',
    sexe: 'F',
    dateNaissance: '2015-11-05',
    lieuNaissance: 'Ebolowa, Cameroun',
    section: 'Francophone',
    classe: 'CE2',
    adresse: 'Essos, Yaoundé',
    telephone: '696112233',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Essama',
      prenom: 'Martin',
      telephone: '696112233',
      profession: 'Instituteur',
      adresse: 'Essos, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Essama Pauline',
      telephone: '677112233',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 17.5, coefficient: 4, appreciation: 'Excellente rédaction' },
        { nom: 'Mathématiques', note: 16.0, coefficient: 4, appreciation: 'Très logique' },
        { nom: 'Anglais', note: 15.5, coefficient: 2, appreciation: 'Bonne prononciation' },
        { nom: 'Histoire-Géographie', note: 16.5, coefficient: 2, appreciation: 'Excellente culture' },
        { nom: 'Sciences', note: 17.0, coefficient: 3, appreciation: 'Très curieuse' },
      ],
      moyenneGenerale: 16.6,
      rang: 1,
      effectif: 30,
      appreciation: 'Élève brillante, excellent travail.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 5,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Théâtre', 'Lecture', 'Chorale'],
    dateInscription: '2021-09-01',
    statut: 'actif'
  },
  {
    id: '7',
    nom: 'Mvondo',
    prenom: 'Christian',
    sexe: 'M',
    dateNaissance: '2015-06-22',
    lieuNaissance: 'Mbalmayo, Cameroun',
    section: 'Francophone',
    classe: 'CE2',
    adresse: 'Mendong, Yaoundé',
    telephone: '675334455',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Mvondo',
      prenom: 'Jean',
      telephone: '675334455',
      profession: 'Agriculteur',
      adresse: 'Mendong, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Mvondo Marie',
      telephone: '699334455',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true, retard: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 12.5, coefficient: 4, appreciation: 'Effort en expression' },
        { nom: 'Mathématiques', note: 14.0, coefficient: 4, appreciation: 'Bon raisonnement' },
        { nom: 'Anglais', note: 11.5, coefficient: 2, appreciation: 'Doit s\'exercer plus' },
        { nom: 'Histoire-Géographie', note: 13.0, coefficient: 2, appreciation: 'Connaissances correctes' },
        { nom: 'Sciences', note: 13.5, coefficient: 3, appreciation: 'Intérêt pour les sciences' },
      ],
      moyenneGenerale: 13.0,
      rang: 18,
      effectif: 30,
      appreciation: 'Travail correct, peut mieux faire.',
      mention: 'Assez Bien'
    },
    comportement: {
      discipline: 3,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 2
    },
    activitesExtrascolaires: ['Football', 'Jeux'],
    dateInscription: '2021-09-01',
    statut: 'actif'
  },

  // Section Francophone - CM1
  {
    id: '8',
    nom: 'Bella',
    prenom: 'Vanessa',
    sexe: 'F',
    dateNaissance: '2014-12-30',
    lieuNaissance: 'Kribi, Cameroun',
    section: 'Francophone',
    classe: 'CM1',
    adresse: 'Omnisport, Yaoundé',
    telephone: '690556677',
    photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Bella',
      prenom: 'François',
      telephone: '690556677',
      profession: 'Pêcheur',
      adresse: 'Omnisport, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Bella Christine',
      telephone: '677556677',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 15.5, coefficient: 4, appreciation: 'Très bonne expression' },
        { nom: 'Mathématiques', note: 14.0, coefficient: 4, appreciation: 'Bonne logique' },
        { nom: 'Anglais', note: 13.5, coefficient: 2, appreciation: 'Bon niveau oral' },
        { nom: 'Histoire-Géographie', note: 15.0, coefficient: 2, appreciation: 'Très cultivée' },
        { nom: 'Sciences', note: 14.5, coefficient: 3, appreciation: 'Bonne compréhension' },
      ],
      moyenneGenerale: 14.5,
      rang: 8,
      effectif: 32,
      appreciation: 'Bonne élève, travail sérieux.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 4,
      travailEquipe: 5,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Natation', 'Dessin'],
    dateInscription: '2020-09-01',
    statut: 'actif'
  },
  {
    id: '9',
    nom: 'Tchinda',
    prenom: 'Rodrigue',
    sexe: 'M',
    dateNaissance: '2014-07-14',
    lieuNaissance: 'Dschang, Cameroun',
    section: 'Francophone',
    classe: 'CM1',
    adresse: 'Nkomo, Douala',
    telephone: '679223344',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Tchinda',
      prenom: 'Emmanuel',
      telephone: '679223344',
      profession: 'Planteur de café',
      adresse: 'Nkomo, Douala',
      relation: 'Père'
    },
    urgence: {
      nom: 'Tchinda Sylvie',
      telephone: '695223344',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: false, excuse: 'Voyage' },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 13.0, coefficient: 4, appreciation: 'Bon niveau général' },
        { nom: 'Mathématiques', note: 15.5, coefficient: 4, appreciation: 'Excellent en géométrie' },
        { nom: 'Anglais', note: 12.0, coefficient: 2, appreciation: 'Besoin de pratique' },
        { nom: 'Histoire-Géographie', note: 14.0, coefficient: 2, appreciation: 'Bonne culture' },
        { nom: 'Sciences', note: 15.0, coefficient: 3, appreciation: 'Très observateur' },
      ],
      moyenneGenerale: 14.0,
      rang: 12,
      effectif: 32,
      appreciation: 'Bon travail, continuer ainsi.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 3
    },
    activitesExtrascolaires: ['Échecs', 'Sciences'],
    dateInscription: '2020-09-01',
    statut: 'actif'
  },

  // Section Francophone - CM2
  {
    id: '10',
    nom: 'Nana',
    prenom: 'Céleste',
    sexe: 'F',
    dateNaissance: '2013-09-08',
    lieuNaissance: 'Foumban, Cameroun',
    section: 'Francophone',
    classe: 'CM2',
    adresse: 'Djoungolo, Yaoundé',
    telephone: '684667788',
    photo: 'https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Nana',
      prenom: 'Sultan',
      telephone: '684667788',
      profession: 'Artisan',
      adresse: 'Djoungolo, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Nana Fatima',
      telephone: '676667788',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 16.5, coefficient: 4, appreciation: 'Excellente dissertation' },
        { nom: 'Mathématiques', note: 17.0, coefficient: 4, appreciation: 'Très douée' },
        { nom: 'Anglais', note: 15.0, coefficient: 2, appreciation: 'Bonne communication' },
        { nom: 'Histoire-Géographie', note: 16.0, coefficient: 2, appreciation: 'Excellente mémoire' },
        { nom: 'Sciences', note: 16.5, coefficient: 3, appreciation: 'Esprit scientifique' },
      ],
      moyenneGenerale: 16.3,
      rang: 2,
      effectif: 30,
      appreciation: 'Excellente élève, prête pour le secondaire.',
      mention: 'Très Bien'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 4,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Mathématiques', 'Débat', 'Calligraphie'],
    dateInscription: '2019-09-01',
    statut: 'actif'
  },
  {
    id: '11',
    nom: 'Atangana',
    prenom: 'Boris',
    sexe: 'M',
    dateNaissance: '2013-02-25',
    lieuNaissance: 'Sangmélima, Cameroun',
    section: 'Francophone',
    classe: 'CM2',
    adresse: 'Mfandena, Yaoundé',
    telephone: '688889900',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Atangana',
      prenom: 'André',
      telephone: '688889900',
      profession: 'Forestier',
      adresse: 'Mfandena, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Atangana Odile',
      telephone: '699889900',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 14.0, coefficient: 4, appreciation: 'Bon niveau' },
        { nom: 'Mathématiques', note: 13.5, coefficient: 4, appreciation: 'Peut progresser' },
        { nom: 'Anglais', note: 12.5, coefficient: 2, appreciation: 'Effort nécessaire' },
        { nom: 'Histoire-Géographie', note: 15.0, coefficient: 2, appreciation: 'Très intéressé' },
        { nom: 'Sciences', note: 14.5, coefficient: 3, appreciation: 'Bon esprit d\'observation' },
      ],
      moyenneGenerale: 13.8,
      rang: 15,
      effectif: 30,
      appreciation: 'Travail correct, peut mieux faire.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Scoutisme', 'Randonnée'],
    dateInscription: '2019-09-01',
    statut: 'actif'
  },

  // Section Anglophone - Class 1
  {
    id: '12',
    nom: 'Ashu',
    prenom: 'Divine',
    sexe: 'F',
    dateNaissance: '2017-12-03',
    lieuNaissance: 'Bamenda, Cameroun',
    section: 'Anglophone',
    classe: 'Class 1',
    adresse: 'Mendong, Yaoundé',
    telephone: '683456789',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ashu',
      prenom: 'Robert',
      telephone: '683456789',
      profession: 'University Professor',
      adresse: 'Mendong, Yaoundé',
      relation: 'Father'
    },
    urgence: {
      nom: 'Ashu Grace',
      telephone: '676456789',
      relation: 'Mother'
    },
    medical: {
      allergies: ['Dust'],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'English Language', note: 18.0, coefficient: 4, appreciation: 'Exceptional skills' },
        { nom: 'Mathematics', note: 17.5, coefficient: 4, appreciation: 'Outstanding performance' },
        { nom: 'Science', note: 17.0, coefficient: 3, appreciation: 'Excellent understanding' },
        { nom: 'Social Studies', note: 16.5, coefficient: 2, appreciation: 'Great knowledge' },
      ],
      moyenneGenerale: 17.4,
      rang: 1,
      effectif: 20,
      appreciation: 'Outstanding student, excellent work!',
      mention: 'Excellent'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 5,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Reading Club', 'Piano', 'Chess'],
    dateInscription: '2023-09-01',
    statut: 'actif'
  },
  {
    id: '13',
    nom: 'Tabi',
    prenom: 'John',
    sexe: 'M',
    dateNaissance: '2017-05-16',
    lieuNaissance: 'Kumba, Cameroun',
    section: 'Anglophone',
    classe: 'Class 1',
    adresse: 'Bastos, Yaoundé',
    telephone: '677334455',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Tabi',
      prenom: 'Peter',
      telephone: '677334455',
      profession: 'Businessman',
      adresse: 'Bastos, Yaoundé',
      relation: 'Father'
    },
    urgence: {
      nom: 'Tabi Mary',
      telephone: '690334455',
      relation: 'Mother'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: false, excuse: 'Family trip' },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'English Language', note: 15.0, coefficient: 4, appreciation: 'Good reading skills' },
        { nom: 'Mathematics', note: 16.0, coefficient: 4, appreciation: 'Excellent at numbers' },
        { nom: 'Science', note: 14.5, coefficient: 3, appreciation: 'Shows curiosity' },
        { nom: 'Social Studies', note: 15.5, coefficient: 2, appreciation: 'Good participation' },
      ],
      moyenneGenerale: 15.2,
      rang: 5,
      effectif: 20,
      appreciation: 'Good student, keep up the effort.',
      mention: 'Good'
    },
    comportement: {
      discipline: 4,
      participation: 4,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Football', 'Art'],
    dateInscription: '2023-09-01',
    statut: 'actif'
  },

  // Section Anglophone - Class 2
  {
    id: '14',
    nom: 'Ngono',
    prenom: 'Aminatou',
    sexe: 'F',
    dateNaissance: '2016-11-02',
    lieuNaissance: 'Douala, Cameroun',
    section: 'Anglophone',
    classe: 'Class 2',
    adresse: 'Bonamoussadi, Douala',
    telephone: '677654321',
    photo: 'https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ngono',
      prenom: 'Celestine',
      telephone: '677654321',
      profession: 'Trader',
      adresse: 'Bonamoussadi, Douala',
      relation: 'Mother'
    },
    urgence: {
      nom: 'Ngono Paul',
      telephone: '699654321',
      relation: 'Father'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: ['Mild asthma']
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'English Language', note: 16.5, coefficient: 4, appreciation: 'Excellent writing' },
        { nom: 'Mathematics', note: 17.0, coefficient: 4, appreciation: 'Outstanding math skills' },
        { nom: 'Science', note: 15.5, coefficient: 3, appreciation: 'Very good understanding' },
        { nom: 'Social Studies', note: 16.0, coefficient: 2, appreciation: 'Active participation' },
      ],
      moyenneGenerale: 16.3,
      rang: 2,
      effectif: 22,
      appreciation: 'Excellent student with great potential.',
      mention: 'Very Good'
    },
    comportement: {
      discipline: 5,
      participation: 5,
      travailEquipe: 4,
      ponctualite: 5
    },
    activitesExtrascolaires: ['Mathematics Club', 'Dance'],
    dateInscription: '2022-09-01',
    statut: 'actif'
  },
  {
    id: '15',
    nom: 'Mbua',
    prenom: 'Collins',
    sexe: 'M',
    dateNaissance: '2016-08-14',
    lieuNaissance: 'Limbe, Cameroun',
    section: 'Anglophone',
    classe: 'Class 2',
    adresse: 'Bonanjo, Douala',
    telephone: '685112233',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Mbua',
      prenom: 'James',
      telephone: '685112233',
      profession: 'Fisherman',
      adresse: 'Bonanjo, Douala',
      relation: 'Father'
    },
    urgence: {
      nom: 'Mbua Janet',
      telephone: '678112233',
      relation: 'Mother'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true, retard: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'English Language', note: 13.5, coefficient: 4, appreciation: 'Good progress' },
        { nom: 'Mathematics', note: 14.0, coefficient: 4, appreciation: 'Improving steadily' },
        { nom: 'Science', note: 13.0, coefficient: 3, appreciation: 'Shows interest' },
        { nom: 'Social Studies', note: 14.5, coefficient: 2, appreciation: 'Good knowledge' },
      ],
      moyenneGenerale: 13.7,
      rang: 12,
      effectif: 22,
      appreciation: 'Good work, keep trying hard.',
      mention: 'Good'
    },
    comportement: {
      discipline: 3,
      participation: 4,
      travailEquipe: 4,
      ponctualite: 2
    },
    activitesExtrascolaires: ['Swimming', 'Music'],
    dateInscription: '2022-09-01',
    statut: 'actif'
  },

  // Ajoutons plus d'élèves pour atteindre 70...
  // Section Anglophone - Class 3
  {
    id: '16',
    nom: 'Ayuk',
    prenom: 'Helen',
    sexe: 'F',
    dateNaissance: '2015-03-21',
    lieuNaissance: 'Buea, Cameroun',
    section: 'Anglophone',
    classe: 'Class 3',
    adresse: 'Mile 17, Douala',
    telephone: '692445566',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    tuteur: {
      nom: 'Ayuk',
      prenom: 'Charles',
      telephone: '692445566',
      profession: 'Nurse',
      adresse: 'Mile 17, Douala',
      relation: 'Father'
    },
    urgence: {
      nom: 'Ayuk Sarah',
      telephone: '679445566',
      relation: 'Mother'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'English Language', note: 15.5, coefficient: 4, appreciation: 'Very good expression' },
        { nom: 'Mathematics', note: 14.5, coefficient: 4, appreciation: 'Good problem solving' },
        { nom: 'Science', note: 16.0, coefficient: 3, appreciation: 'Excellent observation' },
        { nom: 'Social Studies', note: 15.0, coefficient: 2, appreciation: 'Good cultural knowledge' },
      ],
      moyenneGenerale: 15.2,
      rang: 6,
      effectif: 24,
      appreciation: 'Very good student, well done.',
      mention: 'Good'
    },
    comportement: {
      discipline: 4,
      participation: 5,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Debate Club', 'First Aid'],
    dateInscription: '2021-09-01',
    statut: 'actif'
  },

  // Continuons avec plus d'élèves...
  // Pour économiser l'espace, je vais créer des élèves avec des données plus compactes

  // Plus d'élèves francophones
  {
    id: '17',
    nom: 'Kamga',
    prenom: 'Sylvain',
    sexe: 'M',
    dateNaissance: '2015-10-12',
    lieuNaissance: 'Bafoussam, Cameroun',
    section: 'Francophone',
    classe: 'CE2',
    adresse: 'Tsinga, Yaoundé',
    telephone: '696778899',
    tuteur: {
      nom: 'Kamga',
      prenom: 'Daniel',
      telephone: '696778899',
      profession: 'Mécanicien',
      adresse: 'Tsinga, Yaoundé',
      relation: 'Père'
    },
    urgence: {
      nom: 'Kamga Marie',
      telephone: '677778899',
      relation: 'Mère'
    },
    medical: {
      allergies: [],
      medicaments: [],
      problemesSante: []
    },
    historiquePresence: [
      { date: '2024-06-24', present: true },
      { date: '2024-06-25', present: true },
    ],
    bulletin: {
      annee: '2023-2024',
      trimestre: 3,
      matieres: [
        { nom: 'Français', note: 14.0, coefficient: 4, appreciation: 'Bon travail' },
        { nom: 'Mathématiques', note: 15.0, coefficient: 4, appreciation: 'Excellent' },
        { nom: 'Anglais', note: 12.5, coefficient: 2, appreciation: 'Effort nécessaire' },
        { nom: 'Sciences', note: 13.5, coefficient: 3, appreciation: 'Bien' },
      ],
      moyenneGenerale: 13.8,
      rang: 12,
      effectif: 30,
      appreciation: 'Bon élève.',
      mention: 'Bien'
    },
    comportement: {
      discipline: 4,
      participation: 3,
      travailEquipe: 4,
      ponctualite: 4
    },
    activitesExtrascolaires: ['Mécanique', 'Football'],
    dateInscription: '2021-09-01',
    statut: 'actif'
  },

  // ... [Continuer avec plus d'élèves jusqu'à 70]
  // Pour économiser l'espace, je vais créer une structure pour générer les autres élèves

  // Les 53 autres élèves seront générés avec des variations similaires
  // Voici un échantillon représentatif de ce qui serait fait pour les 70 élèves

];

// Fonction pour générer les élèves manquants (18-70)
function generateAdditionalStudents(): Student[] {
  const noms = [
    'Fokou', 'Ndongo', 'Mimbang', 'Ekane', 'Manga', 'Ndoumou', 'Tchiegang', 'Yemba',
    'Nkomo', 'Abanda', 'Onana', 'Mvouma', 'Eteme', 'Biyong', 'Ngo', 'Awono',
    'Mbarga', 'Olinga', 'Ze', 'Mba', 'Owona', 'Eboule', 'Okenve', 'Mebenga',
    'Etoundi', 'Mekoulou', 'Binye', 'Etoute', 'Nkou', 'Mballa', 'Voundi', 'Ebogo'
  ];
  
  const prenoms = {
    M: ['Patrick', 'Michel', 'Claude', 'Alain', 'Roger', 'Francis', 'Gérard', 'Nicolas', 'Eric', 'Daniel', 'Marcel', 'André', 'Simon', 'Jacques', 'Henri'],
    F: ['Marie', 'Anne', 'Christine', 'Françoise', 'Sylvie', 'Catherine', 'Monique', 'Brigitte', 'Nicole', 'Martine', 'Jacqueline', 'Colette', 'Denise', 'Hélène', 'Suzanne']
  };
  
  const prenomsAnglo = {
    M: ['Michael', 'David', 'James', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven'],
    F: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra']
  };

  const villes = ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam', 'Garoua', 'Maroua', 'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi'];
  const quartiers = ['Bastos', 'Mvan', 'Essos', 'Mendong', 'Nlongkak', 'Omnisport', 'Mfandena', 'Tsinga', 'Emana', 'Djoungolo'];
  const classes = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const professions = ['Enseignant', 'Commerçant', 'Agriculteur', 'Chauffeur', 'Infirmier', 'Secrétaire', 'Mécanicien', 'Couturier', 'Coiffeur', 'Électricien'];

  const additionalStudents: Student[] = [];

  for (let i = 18; i <= 70; i++) {
    const sexe = Math.random() > 0.5 ? 'M' : 'F';
    const section = Math.random() > 0.6 ? 'Francophone' : 'Anglophone';
    const classe = section === 'Francophone' 
      ? classes[Math.floor(Math.random() * 5)]
      : classes[Math.floor(Math.random() * 5) + 5];
    
    const nom = noms[Math.floor(Math.random() * noms.length)];
    const prenom = section === 'Francophone' 
      ? prenoms[sexe][Math.floor(Math.random() * prenoms[sexe].length)]
      : prenomsAnglo[sexe][Math.floor(Math.random() * prenomsAnglo[sexe].length)];

    const ville = villes[Math.floor(Math.random() * villes.length)];
    const quartier = quartiers[Math.floor(Math.random() * quartiers.length)];
    const profession = professions[Math.floor(Math.random() * professions.length)];

    // Générer une date de naissance appropriée selon la classe
    const getAgeRange = (classe: string) => {
      if (classe === 'CP' || classe === 'Class 1') return { min: 2017, max: 2018 };
      if (classe === 'CE1' || classe === 'Class 2') return { min: 2016, max: 2017 };
      if (classe === 'CE2' || classe === 'Class 3') return { min: 2015, max: 2016 };
      if (classe === 'CM1' || classe === 'Class 4') return { min: 2014, max: 2015 };
      return { min: 2013, max: 2014 }; // CM2 ou Class 5
    };

    const ageRange = getAgeRange(classe);
    const year = Math.floor(Math.random() * (ageRange.max - ageRange.min + 1)) + ageRange.min;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;

    const student: Student = {
      id: i.toString(),
      nom,
      prenom,
      sexe,
      dateNaissance: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      lieuNaissance: `${ville}, Cameroun`,
      section,
      classe,
      adresse: `${quartier}, ${ville}`,
      telephone: `69${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000 + 100000)}`,
      photo: `https://images.unsplash.com/photo-${sexe === 'M' ? '1472099645785-5658abf4ff4e' : '1580489944761-15a19d654956'}?w=150&h=150&fit=crop&crop=face`,
      tuteur: {
        nom,
        prenom: sexe === 'M' ? 'Jean' : 'Marie',
        telephone: `67${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000 + 100000)}`,
        email: `${nom.toLowerCase()}.${prenom.toLowerCase()}@email.com`,
        profession,
        adresse: `${quartier}, ${ville}`,
        relation: Math.random() > 0.5 ? 'Père' : 'Mère'
      },
      urgence: {
        nom: `${nom} ${sexe === 'M' ? 'Marie' : 'Jean'}`,
        telephone: `68${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 900000 + 100000)}`,
        relation: Math.random() > 0.5 ? 'Mère' : 'Père'
      },
      medical: {
        allergies: Math.random() > 0.8 ? ['Poussière'] : [],
        medicaments: [],
        problemesSante: Math.random() > 0.9 ? ['Asthme léger'] : []
      },
      historiquePresence: [
        { date: '2024-06-24', present: Math.random() > 0.1 },
        { date: '2024-06-25', present: Math.random() > 0.1 },
      ],
      bulletin: {
        annee: '2023-2024',
        trimestre: 3,
        matieres: section === 'Francophone' ? [
          { nom: 'Français', note: Math.floor(Math.random() * 8) + 10, coefficient: 4, appreciation: 'Bon travail' },
          { nom: 'Mathématiques', note: Math.floor(Math.random() * 8) + 10, coefficient: 4, appreciation: 'Correct' },
          { nom: 'Sciences', note: Math.floor(Math.random() * 8) + 10, coefficient: 3, appreciation: 'Bien' },
        ] : [
          { nom: 'English Language', note: Math.floor(Math.random() * 8) + 10, coefficient: 4, appreciation: 'Good work' },
          { nom: 'Mathematics', note: Math.floor(Math.random() * 8) + 10, coefficient: 4, appreciation: 'Correct' },
          { nom: 'Science', note: Math.floor(Math.random() * 8) + 10, coefficient: 3, appreciation: 'Good' },
        ],
        moyenneGenerale: Math.floor(Math.random() * 8) + 10,
        rang: Math.floor(Math.random() * 30) + 1,
        effectif: Math.floor(Math.random() * 10) + 20,
        appreciation: 'Bon élève.',
        mention: 'Bien'
      },
      comportement: {
        discipline: Math.floor(Math.random() * 2) + 4,
        participation: Math.floor(Math.random() * 2) + 3,
        travailEquipe: Math.floor(Math.random() * 2) + 4,
        ponctualite: Math.floor(Math.random() * 2) + 3
      },
      activitesExtrascolaires: ['Sport', 'Lecture'],
      dateInscription: `${year + 5}-09-01`,
      statut: 'actif'
    };

    additionalStudents.push(student);
  }

  return additionalStudents;
}

// Fusionner tous les élèves
const ALL_STUDENTS = [...EXAMPLE_STUDENTS, ...generateAdditionalStudents()];

const STORAGE_KEY = 'students';

function getStudents(): Student[] {
  if (typeof window === 'undefined') return ALL_STUDENTS;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_STUDENTS));
    return ALL_STUDENTS;
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