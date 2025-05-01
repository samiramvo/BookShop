# Gestion de Livres – Frontend React

Application web de gestion de livres (CRUD) avec authentification, réalisée en React.js et Tailwind CSS.

## Prérequis
- Node.js >= 16
- Un backend disponible sur http://localhost:5000/api/

## Installation

1. Clone le dépôt :
   ```sh
   git clone <lien-du-repo>
   cd bookshop-front
   ```
2. Installe les dépendances :
   ```sh
   npm install
   ```
3. Lance le serveur de développement :
   ```sh
   npm run dev
   ```

## Fonctionnalités
- Inscription et connexion des utilisateurs (JWT)
- Création, lecture, modification, suppression de livres
- Interface moderne et responsive (100% Tailwind CSS)
- Gestion automatique du token JWT

## Structure du projet
- `src/components/` : Composants réutilisables (Navbar, AuthForm, BookForm, BookList)
- `src/pages/` : Pages principales (Login, Register, Dashboard)
- `src/App.jsx` : Routing et logique centrale

## Configuration API
- Inscription : `POST /api/auth/register`
- Connexion : `POST /api/auth/login`
- Livres (CRUD) : `GET/POST/PUT/DELETE /api/books` (JWT dans l’en-tête Authorization)

## Personnalisation
- Pour changer l’URL de l’API, modifie les URLs dans les fichiers de pages (Login.jsx, Register.jsx, Dashboard.jsx)

## Sécurité
- Le token JWT est stocké dans le localStorage et envoyé automatiquement pour les requêtes protégées.

## Auteur
- Samira MVOGO

