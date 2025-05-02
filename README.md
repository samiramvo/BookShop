# BookShop - Application de Gestion de Livres

Application web complète de gestion de livres avec authentification, développée avec React.js (frontend) et Node.js (backend).

## Structure du Projet

```
BookShop/
├── backend/        # API Node.js avec MongoDB
└── front-end/      # Interface React.js avec Tailwind CSS
```

## Backend (Node.js)

### Installation

1. Placez-vous dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Copiez le fichier `.env.example` en `.env` 

4. Lancez le serveur :
   ```bash
   npm run dev
   ```

### Endpoints principaux

- `POST   /api/auth/register` : Inscription utilisateur
- `POST   /api/auth/login`    : Connexion utilisateur
- `GET    /api/books`         : Liste tout les livres créés
- `POST   /api/books`         : Ajouter un livre
- `PUT    /api/books/:id`     : Modifier un livre
- `DELETE /api/books/:id`     : Supprimer un livre

## Frontend (React.js)

### Prérequis
- Node.js >= 16
- Backend disponible sur http://localhost:5000/api/

### Installation

1. Placez-vous dans le dossier `front-end` :
   ```bash
   cd front-end
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

### Fonctionnalités
- Inscription et connexion des utilisateurs (JWT)
- Création, lecture, modification, suppression de livres
- Interface moderne
- Gestion automatique du token JWT

## Sécurité
- Authentification par JWT
- Les opérations CRUD sont protégées (utilisateur authentifié)
- Le token JWT est stocké dans le localStorage et envoyé automatiquement

## Prérequis Techniques
- Node.js
- MongoDB (local ou distant)
- npm ou yarn

## Auteur
Samira MVOGO
