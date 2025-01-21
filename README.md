# 📺 Projet Final : Site de Streaming Vidéo de Films et Séries

## Description du Projet

Ce projet consiste en la création d'un site web de streaming vidéo permettant aux utilisateurs de regarder des films et des séries en ligne. Le site offre une interface conviviale où les utilisateurs peuvent naviguer, rechercher et regarder une large sélection de contenus vidéo.

## Nom du groupe

<li><u>Rayane ACHOUCHI:</u> Développeur Front-End </li>
<li><b><u>Mathéo Vovard:</u> Développeur Backend (gestion et sécurité de l'API) + déploiement + gestion du projet</b></li>
<li><u>Joao MARQUIS-DINIS:</u> Designer UX/UI </li>
<li><u>Cédric HU:</u> Création et Gestion des Bases de Données sur AWS </li>

## Fonctionnalités principales

<li> <strong> Inscription/Connexion </strong> : Les utilisateurs peuvent créer un compte ou se connecter à un compte déjà existant. </li>
<li> <strong> Gestion de profil </strong> : Les utilisateurs peuvent gérer leurs profils (changer les informations personnelles, ajouter une photo de profil, etc.). </li>
<li> <strong>Catalogue de Films et Séries </strong> : Une bibliothèque contenant des films et séries classés par genre, popularité, nouveautés, etc. </li>
<li> <strong>Streaming vidéo</strong> : Les utilisateurs peuvent regarder des vidéos en streaming sans téléchargement. </li>

## Fonctionnalités secondaires

<li> <strong>Recherche avancée </strong>: Les utilisateurs peuvent rechercher des films et séries par titre, genre, acteur, réalisateur, etc.</li>
<li> <strong> Favoris </strong> : Les utilisateurs peuvent ajouter des films et des séries à leur liste de favoris.
</li>
<li> <strong>Historique de visionnage </strong>: Une section permettant de retrouver les films et séries récemment visionnés. </li>
<li> <strong> Système de notation et de commentaires </strong> : Les utilisateurs peuvent noter et commenter les films et séries qu'ils ont regardés. </li>

## 🎯 Objectifs du projet

<li> Développer un site web responsive pour le streaming vidéo.</li>
<li> Implémenter des fonctionnalités d'authentification et de gestion des utilisateurs.
</li>
<li> Intégrer une base de données pour stocker les informations relatives aux utilisateurs, aux vidéos, aux commentaires, etc.</li>
<li> Offrir une expérience utilisateur fluide avec une interface intuitive.</li>
<li> Gérer la diffusion de vidéos en streaming de manière efficace.</li>

## Technologie utilisée 

### Backend :

<ul>  
    <li>Langages: TypeScript</li>
    <li>Framework: Express, Node.js</li>
    <li>Bibliothèques: nodemon, concurrently, yup</li>
    <li>Base de donnée: MongoDB / PostgreSQL</li>
    <li>Authentification: NextAuth / OAuth2</li>
    <li>API: API RESTful pour la gestion des utilisateurs, des vidéos, des commentaires, etc... </li>
</ul>

### Frontend :

<ul>
<li>Langages: HTML5, CSS3, JavaScript </li>
<li>Framework: React</li>
<li>Bibliothèques: ShadcnUI, TailwindCSS</li>
<li>Lecteur Vidéo: Video.js / Plyr.js</li>
</ul>

### Streaming Video :
<ul>
<li>Protocole: HLS (HTTP Live Streaming)</li>
<li>CDN (Content Delivery Network) pour la distribution efficace du contenu</li>
</ul>

### Hébergement et Serveur :
<ul>
<li>Server web : Nginx / Apache</li>
<li>Hébergement : AWS, Heroku</li>
</ul>
<hr>

# 📁 Structure du Projet

```bash
    .
├── api/                # Dossier pour les fichiers backend
│   ├── index.js            # Application principale backend (ou app.py pour Python)
│   ├── models/             # Modèles pour la base de données
│   └── routes/             # Routes API pour les fonctionnalités
│
├── frontend/               # Dossier pour les fichiers frontend
│   ├── public/             # Fichiers publics (images, styles)
│   ├── app/                # Code source (composants React, services)
│             # Page HTML principale
│
├── db/                     # Fichiers de migration et schéma de la base de données
│
├── README.md               # Ce fichier
├── requirements.txt        # Liste des dépendances Python (ou package.json pour Node.js)
└── .gitignore              # Fichier pour ignorer certains fichiers dans git
```
<hr>

# 🚀 Installation et Démarrage 

### Prérequis

<ul>
<li> Node.js </li>
<li> Base de donnée </li>
<li> Git </li> 
</ul>

### Étape d'installation

### 1. Clonez le dépôt :
```bash
    git clone git@github.com:MARQUESDINISJoaoGabriel/Server-Web-Efrei-Projet.git
    cd Server-Web-Efrei-Projet
```
### 2. Backend :
<ul>
<li> Installez les dépendances :</li>
</ul>

```bash
npm install
yarn install
```

<ul>
<li> Configurer la base de donnée dans les fichiers de configuration </li>
<li> Lancez le server backend </li>
</ul>

```bash
node index.js
```

### 3. Frontend

<ul>
<li> Allez dans le dossier frontend </li>
</ul>

```bash
cd app-front
```

<ul>
<li> Installez les dépendances </li>
</ul>

```bash
npm install
yarn install
```

<ul>
<li> Lancez l'application frontend </li>
</ul>

```bash
    npm run dev | npm start
    yarn dev
```

### 4. Accès au site

<ul>
<li>
    Ouvrez votre navigateur et accédez à <strong> http://localhost:3000 </strong>pour lancer le site
</li>
</ul>
<hr>

# ✅ Tests

1. Tests unitaires pour les fonctions backend :
 
```bash
npm test
yarn test
```
2. Tests d'intégration pour vérifier les fonctionnalités principales du site (authentification, streaming, etc...)

<hr>

# 🎨 Capture d'Écran

# 📌 Fonctionnalités à Améliorer

<li> Améliorer les performances du streaming pour les connexions à faible bande passante. </li>
<li> Ajouter un système de recommandation basé sur les préférences des utilisateurs. </li>
<li> Intégrer des sous-titres et plusieurs langues pour les vidéos.</li>

<hr>

# 👨‍💻 Auteur

<li> Nom de l'Auteur : Rayane</li>
<li> Email : rayane.achouchi@efrei.net</li>
<li> GitHub : https://github.com/RayaneChCh-dev</li>
