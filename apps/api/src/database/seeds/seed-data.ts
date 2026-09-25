/**
 * Données de démonstration utilisées par `seed.ts`.
 * Tout est fictif : utilisateurs, prompts, ventes.
 */
import { SocialPlatform, UserRoles } from '../../common/enums/user.enum';
import { PromptStatus } from '../../common/enums/prompt.enum';

export const DEMO_PASSWORD = 'Demo1234!';

export type SeedUser = {
  key: string;
  email: string;
  username: string;
  role: UserRoles;
  bio: string;
  color: string;
  socials?: { platform: SocialPlatform; url: string }[];
};

export const USERS: SeedUser[] = [
  {
    key: 'superadmin',
    email: 'superadmin@promptverse.dev',
    username: 'superadmin',
    role: UserRoles.SUPER_ADMIN,
    bio: 'Compte super administrateur de la plateforme PromptVerse.',
    color: '#111827',
  },
  {
    key: 'admin',
    email: 'admin@promptverse.dev',
    username: 'admin',
    role: UserRoles.ADMIN,
    bio: 'Modération du catalogue, des catégories et des outils IA.',
    color: '#374151',
  },
  {
    key: 'lea',
    email: 'lea.martin@promptverse.dev',
    username: 'lea_martin',
    role: UserRoles.USER,
    bio: 'Growth marketer freelance. Je partage les prompts que j’utilise tous les jours pour mes clients.',
    color: '#e11d48',
    socials: [
      {
        platform: SocialPlatform.LINKEDIN,
        url: 'https://www.linkedin.com/in/lea-martin-demo',
      },
      {
        platform: SocialPlatform.WEBSITE,
        url: 'https://lea-martin.example.com',
      },
    ],
  },
  {
    key: 'karim',
    email: 'karim.benali@promptverse.dev',
    username: 'karim_dev',
    role: UserRoles.USER,
    bio: 'Développeur full-stack TypeScript. Prompts pour coder plus vite et mieux.',
    color: '#2563eb',
    socials: [
      {
        platform: SocialPlatform.GITHUB,
        url: 'https://github.com/karim-dev-demo',
      },
    ],
  },
  {
    key: 'sofia',
    email: 'sofia.rossi@promptverse.dev',
    username: 'sofia_art',
    role: UserRoles.USER,
    bio: 'Directrice artistique. Prompts Midjourney et DALL·E testés et affinés.',
    color: '#9333ea',
    socials: [
      {
        platform: SocialPlatform.INSTAGRAM,
        url: 'https://instagram.com/sofia.art.demo',
      },
    ],
  },
  {
    key: 'thomas',
    email: 'thomas.dubois@promptverse.dev',
    username: 'thomas_prof',
    role: UserRoles.USER,
    bio: 'Formateur et ancien enseignant. Des prompts pour apprendre et faire apprendre.',
    color: '#059669',
  },
  {
    key: 'demo',
    email: 'demo@promptverse.dev',
    username: 'demo_acheteur',
    role: UserRoles.USER,
    bio: 'Compte acheteur de démonstration.',
    color: '#ea580c',
  },
];

export const CATEGORIES = [
  { key: 'marketing', name: 'Marketing', color: ['#f43f5e', '#fb923c'] },
  { key: 'dev', name: 'Développement', color: ['#2563eb', '#06b6d4'] },
  { key: 'writing', name: 'Rédaction', color: ['#7c3aed', '#c084fc'] },
  {
    key: 'design',
    name: 'Design & Illustration',
    color: ['#db2777', '#8b5cf6'],
  },
  { key: 'business', name: 'Business', color: ['#0f766e', '#22c55e'] },
  { key: 'education', name: 'Éducation', color: ['#ca8a04', '#f59e0b'] },
  { key: 'productivity', name: 'Productivité', color: ['#475569', '#0ea5e9'] },
  { key: 'seo', name: 'SEO', color: ['#16a34a', '#84cc16'] },
] as const;

export const AI_TOOLS = [
  { key: 'chatgpt', name: 'ChatGPT' },
  { key: 'claude', name: 'Claude' },
  { key: 'gemini', name: 'Gemini' },
  { key: 'midjourney', name: 'Midjourney' },
  { key: 'dalle', name: 'DALL·E' },
  { key: 'sd', name: 'Stable Diffusion' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
export type AiToolKey = (typeof AI_TOOLS)[number]['key'];

export type SeedPrompt = {
  title: string;
  seller: string;
  category: CategoryKey;
  aiTool: AiToolKey;
  price: string;
  promptContent: string;
  previewResult: string;
  sales: number;
  views: number;
  favorites: number;
  rating: string;
  featured?: boolean;
  status?: PromptStatus;
  previews?: number; // nombre d'images d'aperçu générées
  daysAgo: number;
};

export const PROMPTS: SeedPrompt[] = [
  {
    title: 'Séquence de 5 emails de lancement produit',
    seller: 'lea',
    category: 'marketing',
    aiTool: 'chatgpt',
    price: '9.90',
    promptContent:
      'Tu es un copywriter spécialisé en e-mailing B2C. Rédige une séquence de 5 emails pour le lancement de [PRODUIT], destiné à [CIBLE].\n\nContraintes :\n- Email 1 : teasing (J-7), Email 2 : problème (J-5), Email 3 : solution (J-3), Email 4 : preuve sociale (J-1), Email 5 : lancement + urgence (J0)\n- Pour chaque email : 3 objets alternatifs (< 45 caractères), un pré-header, un corps de 120 à 180 mots, un seul CTA\n- Ton : [TON], tutoiement ou vouvoiement selon [REGISTRE]\n- Termine par un tableau récapitulatif (jour, objectif, CTA).',
    previewResult:
      'Email 1 (J-7) – Objets : « Un truc arrive… », « Tu vas vouloir voir ça », « Plus que 7 jours »\nPré-header : On prépare quelque chose depuis 6 mois.\n« Depuis six mois, on travaille en silence sur un outil qui va changer ta façon de… »',
    sales: 42,
    views: 1310,
    favorites: 96,
    rating: '4.80',
    featured: true,
    daysAgo: 48,
  },
  {
    title: 'Calendrier éditorial LinkedIn sur 30 jours',
    seller: 'lea',
    category: 'marketing',
    aiTool: 'claude',
    price: '6.50',
    promptContent:
      'Agis comme un ghostwriter LinkedIn. Mon activité : [ACTIVITÉ]. Ma cible : [CIBLE]. Mon objectif : [OBJECTIF].\n\nConstruis un calendrier éditorial de 30 jours sous forme de tableau : jour, format (texte, carrousel, sondage, vidéo), angle, accroche (1re ligne), CTA.\nRépartis : 40 % expertise, 30 % storytelling, 20 % preuve sociale, 10 % promotion.\nPuis rédige intégralement les 3 premiers posts.',
    previewResult:
      '| Jour | Format | Angle | Accroche |\n| 1 | Texte | Storytelling | « J’ai perdu mon plus gros client un mardi matin. » |\n| 2 | Carrousel | Expertise | « 7 erreurs qui plombent vos devis » |',
    sales: 31,
    views: 980,
    favorites: 71,
    rating: '4.60',
    daysAgo: 40,
  },
  {
    title: 'Fiches produit e-commerce optimisées conversion',
    seller: 'lea',
    category: 'seo',
    aiTool: 'chatgpt',
    price: '4.90',
    promptContent:
      'Tu es expert en rédaction e-commerce et SEO. À partir des caractéristiques suivantes : [CARACTÉRISTIQUES], rédige une fiche produit pour [PRODUIT].\n\nStructure : titre SEO (< 60 caractères), meta description (< 155), accroche bénéfice, 5 puces bénéfices (pas caractéristiques), paragraphe usage, FAQ de 4 questions.\nMot-clé principal : [MOT-CLÉ], à placer naturellement 3 fois.',
    previewResult:
      'Titre SEO : Gourde isotherme inox 750 ml – 24 h de fraîcheur\nMeta : Gardez vos boissons fraîches 24 h et chaudes 12 h. Inox sans BPA, bouchon anti-fuite. Livraison offerte dès 30 €.',
    sales: 57,
    views: 1620,
    favorites: 88,
    rating: '4.50',
    daysAgo: 33,
  },
  {
    title: 'Revue de code senior TypeScript / NestJS',
    seller: 'karim',
    category: 'dev',
    aiTool: 'claude',
    price: '12.00',
    promptContent:
      'Tu es un développeur senior NestJS/TypeScript qui fait une revue de code bienveillante mais exigeante.\n\nAnalyse le code ci-dessous et classe tes remarques en : 🔴 bloquant, 🟠 important, 🟢 suggestion.\nPour chaque remarque : ligne concernée, problème, pourquoi c’est un problème, correction proposée (code).\nVérifie en priorité : sécurité (injection, fuite de données, validation DTO), gestion d’erreurs, transactions TypeORM, typage strict, testabilité.\nTermine par une note globale sur 10 et les 3 actions prioritaires.\n\n```ts\n[CODE]\n```',
    previewResult:
      '🔴 L.42 – `findOne({ where: { id } })` sans vérifier le propriétaire : n’importe quel utilisateur connecté peut lire la ressource d’un autre (IDOR).\nCorrection : ajouter `sellerId: user.id` dans le where, ou lever une ForbiddenException.',
    sales: 64,
    views: 2140,
    favorites: 152,
    rating: '4.90',
    featured: true,
    daysAgo: 45,
  },
  {
    title: 'Générateur de tests unitaires Jest',
    seller: 'karim',
    category: 'dev',
    aiTool: 'chatgpt',
    price: '7.50',
    promptContent:
      'Écris les tests unitaires Jest de la fonction/classe suivante.\n\nRègles :\n- Un `describe` par méthode, des `it` en français qui décrivent un comportement\n- Couvre : cas nominal, cas limites, erreurs attendues\n- Mocke les dépendances (repositories, services externes) avec `jest.fn()`\n- Pas de test d’implémentation interne, uniquement du comportement observable\n- Donne ensuite la liste des cas NON couverts et pourquoi\n\n```ts\n[CODE]\n```',
    previewResult:
      "describe('PurchasesService.handleWebhook', () => {\n  it('ne crédite pas deux fois le vendeur si le webhook est rejoué', async () => { … });\n  it('passe l’achat en COMPLETED quand le paiement réussit', async () => { … });\n});",
    sales: 38,
    views: 1190,
    favorites: 84,
    rating: '4.70',
    daysAgo: 29,
  },
  {
    title: 'Architecte Docker Compose + CI GitHub Actions',
    seller: 'karim',
    category: 'dev',
    aiTool: 'claude',
    price: '14.90',
    promptContent:
      'Tu es un ingénieur DevOps. Mon projet : [STACK] (ex. API NestJS + MySQL + front React).\n\nProduis :\n1. Un `docker-compose.dev.yml` (hot reload, volumes, healthchecks, depends_on: service_healthy)\n2. Des Dockerfile multi-stage pour la prod (utilisateur non-root, image minimale)\n3. Un workflow GitHub Actions : lint → tests (avec service MySQL) → build des images → push sur GHCR → déploiement SSH\n4. La liste des secrets GitHub à créer\nExplique chaque choix en une phrase.',
    previewResult:
      'services:\n  database:\n    image: mysql:8.4\n    healthcheck:\n      test: ["CMD-SHELL", "mysqladmin ping -h 127.0.0.1 --silent"]\n  api:\n    depends_on:\n      database:\n        condition: service_healthy',
    sales: 23,
    views: 870,
    favorites: 61,
    rating: '4.80',
    daysAgo: 12,
  },
  {
    title: 'Expliquer un bug à partir d’une stack trace',
    seller: 'karim',
    category: 'dev',
    aiTool: 'gemini',
    price: '0.99',
    promptContent:
      'Voici une erreur et le code concerné. Explique :\n1. Ce que signifie l’erreur en une phrase simple\n2. La cause la plus probable, puis 2 causes alternatives\n3. Comment le vérifier (commande, log, breakpoint)\n4. Le correctif minimal\n\nErreur :\n[STACK TRACE]\n\nCode :\n[CODE]',
    previewResult:
      '1. `ECONNREFUSED 127.0.0.1:3306` : l’API essaie de joindre MySQL mais personne n’écoute sur ce port.\n2. Cause probable : dans Docker, l’hôte n’est pas `localhost` mais le nom du service (`database`).',
    sales: 112,
    views: 3050,
    favorites: 140,
    rating: '4.40',
    daysAgo: 60,
  },
  {
    title: 'Portrait éditorial lumière naturelle',
    seller: 'sofia',
    category: 'design',
    aiTool: 'midjourney',
    price: '5.00',
    promptContent:
      'editorial portrait of [SUJET], soft natural window light, 85mm lens, shallow depth of field, muted earthy color palette, film grain, Kodak Portra 400, candid expression, minimal background, magazine cover composition --ar 4:5 --style raw --v 6.1 --s 180',
    previewResult:
      '4 variations obtenues : lumière latérale douce, peau naturelle non retouchée, arrière-plan crème flou. Idéal pour couvertures de magazine et visuels LinkedIn premium.',
    sales: 49,
    views: 1880,
    favorites: 133,
    rating: '4.90',
    featured: true,
    previews: 2,
    daysAgo: 38,
  },
  {
    title: 'Pack icônes 3D style clay',
    seller: 'sofia',
    category: 'design',
    aiTool: 'dalle',
    price: '8.00',
    promptContent:
      'A single 3D clay-style icon of [OBJET], soft rounded shapes, pastel [COULEUR] palette, matte plasticine texture, subtle ambient occlusion, centered on a plain off-white background, isometric view, studio lighting, high detail, app icon style, no text',
    previewResult:
      'Série cohérente de 12 icônes (fusée, cadenas, graphique, bulle de chat…) avec la même lumière et la même texture. Fonds unis faciles à détourer.',
    sales: 27,
    views: 1020,
    favorites: 79,
    rating: '4.60',
    previews: 2,
    daysAgo: 21,
  },
  {
    title: 'Illustrations de concept art fantasy',
    seller: 'sofia',
    category: 'design',
    aiTool: 'sd',
    price: '6.00',
    promptContent:
      'Positive: epic fantasy landscape, [LIEU], floating islands, ancient ruins covered in moss, volumetric god rays, dramatic clouds, matte painting, highly detailed, concept art, trending on artstation, 8k\nNegative: blurry, lowres, watermark, text, deformed, oversaturated\nSteps: 30 | CFG: 7 | Sampler: DPM++ 2M Karras | 1216x832',
    previewResult:
      'Paysages cohérents en 16:9, parfaits pour des fonds d’écran, des jaquettes ou des moodboards de jeu vidéo.',
    sales: 18,
    views: 760,
    favorites: 54,
    rating: '4.30',
    previews: 2,
    daysAgo: 16,
  },
  {
    title: 'Business plan express en 1 heure',
    seller: 'lea',
    category: 'business',
    aiTool: 'claude',
    price: '11.00',
    promptContent:
      'Tu es consultant en création d’entreprise. Mon projet : [IDÉE], zone : [VILLE/PAYS], budget de départ : [BUDGET].\n\nPose-moi d’abord 5 questions essentielles, attends mes réponses, puis produis :\n- Proposition de valeur (canvas)\n- Analyse de 3 concurrents\n- Prévisionnel simplifié sur 3 ans (tableau CA, charges, résultat)\n- Seuil de rentabilité\n- 5 risques et leur parade',
    previewResult:
      'Avant de commencer, 5 questions :\n1. Qui paiera concrètement : particuliers, entreprises, collectivités ?\n2. Quel prix moyen imagines-tu par client ?\n…',
    sales: 20,
    views: 690,
    favorites: 47,
    rating: '4.50',
    daysAgo: 25,
  },
  {
    title: 'Réponse diplomatique à un client mécontent',
    seller: 'thomas',
    category: 'business',
    aiTool: 'chatgpt',
    price: '2.50',
    promptContent:
      'Voici le message d’un client mécontent : [MESSAGE].\nContexte : [CONTEXTE].\n\nRédige 3 réponses (courte, standard, très formelle) qui :\n- reconnaissent le problème sans se justifier\n- proposent une solution concrète et un délai\n- n’admettent pas de faute juridique\nTermine par ce qu’il ne faut surtout PAS écrire dans ce cas.',
    previewResult:
      'Version courte : « Bonjour Mme Durand, vous avez raison, ce retard n’est pas acceptable. Votre commande part aujourd’hui en express, à nos frais… »',
    sales: 73,
    views: 1540,
    favorites: 66,
    rating: '4.40',
    daysAgo: 55,
  },
  {
    title: 'Créateur de quiz à partir d’un cours',
    seller: 'thomas',
    category: 'education',
    aiTool: 'gemini',
    price: '3.90',
    promptContent:
      'Voici un support de cours : [TEXTE].\nNiveau des apprenants : [NIVEAU].\n\nGénère un quiz de 10 questions : 6 QCM (4 choix, un seul correct), 2 vrai/faux, 2 questions ouvertes courtes.\nPour chaque question : la bonne réponse, une explication de 2 lignes, et la notion du cours évaluée.\nDifficulté progressive.',
    previewResult:
      'Q1 (QCM) – Quel mot-clé TypeORM marque une colonne de suppression logique ?\nA. @SoftColumn B. @DeleteDateColumn ✅ C. @RemovedAt D. @Deleted\nExplication : @DeleteDateColumn remplit la date au lieu de supprimer la ligne.',
    sales: 34,
    views: 940,
    favorites: 58,
    rating: '4.70',
    daysAgo: 19,
  },
  {
    title: 'Professeur particulier socratique',
    seller: 'thomas',
    category: 'education',
    aiTool: 'claude',
    price: '0.00',
    promptContent:
      'Tu es un professeur particulier qui utilise la méthode socratique. Sujet : [SUJET]. Mon niveau : [NIVEAU].\nNe me donne jamais directement la réponse. Pose une seule question à la fois, attends ma réponse, corrige avec bienveillance, et augmente la difficulté quand je réussis 2 fois de suite. Toutes les 5 questions, fais un mini bilan.',
    previewResult:
      '« Commençons simplement : selon toi, pourquoi a-t-on besoin d’une clé étrangère entre deux tables ? Prends le temps d’y réfléchir. »',
    sales: 205,
    views: 4200,
    favorites: 310,
    rating: '4.80',
    featured: true,
    daysAgo: 70,
  },
  {
    title: 'Compte rendu de réunion structuré',
    seller: 'thomas',
    category: 'productivity',
    aiTool: 'chatgpt',
    price: '1.99',
    promptContent:
      'Voici la transcription brute d’une réunion : [TRANSCRIPTION].\n\nProduis un compte rendu :\n1. Contexte en 2 lignes\n2. Décisions prises\n3. Tableau des actions : action, responsable, échéance\n4. Points en suspens\n5. Un email de synthèse prêt à envoyer aux participants',
    previewResult:
      'Décisions : la mise en production est décalée au 12 ; la revue de sécurité devient obligatoire avant chaque release.\n| Action | Responsable | Échéance |\n| Corriger le healthcheck MySQL | Anis | Lundi |',
    sales: 88,
    views: 2010,
    favorites: 102,
    rating: '4.60',
    daysAgo: 8,
  },
  {
    title: 'Planificateur de semaine anti-procrastination',
    seller: 'lea',
    category: 'productivity',
    aiTool: 'gemini',
    price: '2.00',
    promptContent:
      'Voici mes tâches de la semaine avec une estimation de durée : [TÂCHES]. Mes créneaux disponibles : [CRÉNEAUX].\nClasse-les avec la matrice d’Eisenhower, puis construis un planning jour par jour en blocs de 50 min + 10 min de pause, en plaçant les tâches difficiles le matin. Ajoute une marge de 20 % pour les imprévus.',
    previewResult:
      'Lundi 9h00-9h50 : rédaction dossier projet (urgent + important)\n10h00-10h50 : suite rédaction\n11h00-11h50 : emails et administratif…',
    sales: 15,
    views: 520,
    favorites: 29,
    rating: '4.20',
    daysAgo: 4,
  },
  {
    title: 'Article de blog long format SEO',
    seller: 'lea',
    category: 'writing',
    aiTool: 'claude',
    price: '8.50',
    promptContent:
      'Rédige un article de blog de 1500 mots sur [SUJET], mot-clé principal [MOT-CLÉ], intention de recherche [INTENTION].\nPlan : H1, introduction avec accroche, 5 à 7 H2 avec H3 si besoin, conclusion avec CTA.\nInclure : une liste, un tableau comparatif, une FAQ de 3 questions, des suggestions de liens internes entre crochets.\nStyle : phrases courtes, exemples concrets, pas de remplissage.',
    previewResult:
      'H1 : Docker pour les débutants : le guide pour enfin comprendre les conteneurs\nIntro : « Ça marche sur ma machine. » Si cette phrase vous rappelle quelque chose, cet article est pour vous…',
    sales: 29,
    views: 1100,
    favorites: 64,
    rating: '4.50',
    daysAgo: 14,
  },
  {
    title: 'Ancien prompt de newsletter (archivé)',
    seller: 'lea',
    category: 'writing',
    aiTool: 'chatgpt',
    price: '3.00',
    promptContent: 'Rédige une newsletter hebdomadaire sur [THÈME]…',
    previewResult: 'Version remplacée par la séquence de lancement.',
    sales: 5,
    views: 210,
    favorites: 3,
    rating: '3.80',
    status: PromptStatus.ARCHIVED,
    daysAgo: 90,
  },
];

/** Achats de démo : acheteur -> titre du prompt. */
export const PURCHASES: { buyer: string; prompt: string; daysAgo: number }[] = [
  {
    buyer: 'demo',
    prompt: 'Revue de code senior TypeScript / NestJS',
    daysAgo: 6,
  },
  { buyer: 'demo', prompt: 'Portrait éditorial lumière naturelle', daysAgo: 3 },
  { buyer: 'demo', prompt: 'Professeur particulier socratique', daysAgo: 2 },
  {
    buyer: 'karim',
    prompt: 'Séquence de 5 emails de lancement produit',
    daysAgo: 10,
  },
  { buyer: 'karim', prompt: 'Pack icônes 3D style clay', daysAgo: 7 },
  {
    buyer: 'lea',
    prompt: 'Architecte Docker Compose + CI GitHub Actions',
    daysAgo: 5,
  },
  { buyer: 'sofia', prompt: 'Compte rendu de réunion structuré', daysAgo: 4 },
  { buyer: 'thomas', prompt: 'Générateur de tests unitaires Jest', daysAgo: 9 },
  {
    buyer: 'thomas',
    prompt: 'Calendrier éditorial LinkedIn sur 30 jours',
    daysAgo: 1,
  },
];
