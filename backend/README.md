# Backend Node.js CRUD – Gestion de Livres

## Installation

1. Placez-vous dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Copiez le fichier `.env.example` en `.env` et modifiez les valeurs si besoin.

4. Lancez le serveur :
   ```bash
   npm run dev
   ```

## Endpoints principaux

- `POST   /api/auth/register` : Inscription utilisateur
- `POST   /api/auth/login`    : Connexion utilisateur
- `GET    /api/books`         : Liste tout les livres créés
- `POST   /api/books`         : Ajouter un livre
- `PUT    /api/books/:id`     : Modifier un livre
- `DELETE /api/books/:id`     : Supprimer un livre

## Prérequis
- Node.js
- MongoDB (local ou distant)

## Sécurité
- Authentification par JWT
- Les opérations CRUD sont protégées (utilisateur authentifié)

## Auteur
Samira MVOGO
