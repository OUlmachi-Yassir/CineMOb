# Cinema Streaming App

## Contexte du Projet

L'application de streaming permet aux utilisateurs de s'abonner, de regarder des films, de noter des films, d'ajouter des commentaires et de gérer une liste de films favoris. Elle offre aussi une interface administrateur pour la gestion des utilisateurs et des statistiques, ainsi que des notifications programmées pour les utilisateurs.

### Fonctionnalités

#### Utilisateurs
- **Inscription des utilisateurs** : Permet aux utilisateurs de créer un compte.
- **Connexion et gestion des abonnés** : Authentification sécurisée avec gestion des comptes pour les utilisateurs abonnés.

#### Streaming et Interactions
- **Streaming de films** : Accès au catalogue de films pour les utilisateurs abonnés.
- **Notation des films** : Les utilisateurs peuvent évaluer les films.
- **Recherche et filtrage** :
  - Recherche de films par nom.
  - Filtrage des films par genre et date.

#### Commentaires et Favoris
- **Commentaires** : Ajouter des commentaires sur les films et afficher ceux associés à chaque film.
- **Films favoris** : Les utilisateurs peuvent gérer une liste de leurs films préférés.

#### Contenus et Suggestions
- **Affichage des nouveautés** : Présentation des derniers films ajoutés sur la page d’accueil.
- **Détail des films** : Affichage des informations détaillées avec des suggestions de films en relation.

#### Administration
- **Interface administrateur** :
  - Gestion des utilisateurs.
  - Analyse des statistiques d’utilisation (temps passé, nombre de visiteurs, nombre d’inscriptions).

#### Notifications
- **Types de notifications** :
  - Envoi de notifications aux utilisateurs n'ayant pas ouvert l'application depuis plus de 24 heures.
  - Notifications en temps réel pour informer des nouveaux films ajoutés.
  - Alertes promotionnelles.
  - Rappels pour les abonnements à renouveler.

#### Paiement et Vérification
- **Paiement par carte bancaire** : Maquette pour le paiement sécurisé par carte de crédit.
- **Service de vérification des cartes** : Validation des numéros de carte bancaire avec l'algorithme Luhn.

### Technologies Utilisées
- **Tests** : Jest, Supertest, React Native Testing Library
- **Backend** : NestJS, TypeORM
- **Frontend Mobile** : React Native, Expo

---

## Exécution du Projet

### Backend (API)

#### Prérequis
- Node.js (version 16.x ou supérieure)
- PostgreSQL ou MySQL pour la base de données
-Express

#### Installation

1. Clonez le repo du backend :
   ```bash
   git clone https://github.com/OUlmachi-Yassir/cinema-backend.git
   cd cinema-backend
2. Installez les dépendances :

   Dans votre bach run this commend : npm install

3. Configurez votre base de données dans le fichier src/config/db.config 
4. Démarrez le serveur backend : npm run start:dev


### Frontend (Mobile)
      Prérequis
      Node.js
      Expo CLI
      Android Studio ou Xcode pour l'émulation des appareils
      Installation
   1.  Clonez le repo du frontend : https://github.com/OUlmachi-Yassir/CineMOb
   2. Installez les dépendances : npm install
   3. Démarrez le projet avec Expo : npx expo start
