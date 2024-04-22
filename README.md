# 📄 README.md

## 🌐 Informations Générales

Ce projet est une bibliothèque de modules Node.js qui fournissent une abstraction pour effectuer des appels API REST, gérer les réponses, et intégrer des tests unitaires pour garantir la stabilité et la fiabilité du code.

Il comprend des configurations pour TypeScript, Jest (un système de test), et utilise `tsup` pour le processus de construction et le bundling des modules.

Le projet est configuré de manière à pouvoir être compilé en CommonJS ainsi qu'en modules ES pour une interopérabilité maximale.

## 🧬 Structure du Projet

Voici une représentation de la structure de répertoires du projet et de son contenu :

```
.
├── jest.config.js      # Configuration de Jest pour les tests unitaires
├── package.json        # Fichier de configuration du projet Node.js
├── src                 # Dossier contenant le code source du projet
│   ├── api_fetcher     # Gestion des requêtes API
│   │   ├── api_fetcher.interface.ts # Interface définissant la structure des fetchers
│   │   └── api_fetcher.ts           # Implémentation de l'interface de fetcher
│   ├── api_parser      # Gestion des réponses de l'API
│   │   ├── api_interface.ts # Interface pour les réponses structurées
│   │   ├── api_messages.ts  # Mappage des messages des réponses API
│   │   └── api_parser.ts    # Parser pour traiter et renvoyer les réponses de l'API
│   ├── index.ts         # Point d'entrée pour exposer les modules de src à d'autres utilisateurs
│   └── tests            # Dossier pour les tests unitaires
│       ├── constants.test.ts # Tests pour les constantes API
│       └── parser.test.ts    # Tests pour le parser d'API
├── tsconfig.json       # Configuration de TypeScript pour le projet
└── tsup.config.ts      # Configuration pour tsup, l'outil de build

6 dossiers, 10 fichiers
```

### Description des fichiers et répertoires:

- `jest.config.js` : Configuration de Jest qui précise l'environnement de test et l'utilisation de ts-jest pour transpiler les tests typescript.
- `package.json` : Contient les métadonnées du projet, les scripts pour construire et tester le projet, ainsi que les dépendances et les versions respectives nécessaires pour le projet.
- `src` : Contient le code source principal du projet, notamment les définitions, implémentations et exportations des classes et interfaces clés autour des fonctionnalités d'appel et de parsing d'API.
- `src/api_fetcher` : Inclut les entités responsables de la construction et l'exécution des appels API.
- `src/api_parser` : Comprend les outils pour normaliser et gérer les réponses reçues suite aux appels API, en y associer un statut et un message.
- `src/index.ts` : Centralise les exportations des modules définis dans `src` afin de faciliter leur utilisation en tant que package.
- `src/tests` : Contient les tests unitaires qui vérifient la logique et la fiabilité des modules d'appel et de parsing d'API.
- `tsconfig.json` : Configure les paramètres de TypeScript, y compris les chemins de sortie, le mode strict, et les options de compatibilité ES.
- `tsup.config.ts` : Définit la configuration de l'outil de build `tsup` qui détermine le format de build, les options de sourcemap, et gère également le nettoyage du répertoire de sortie.

## 🛠️ Comment Utiliser

Pour utiliser ce projet, suivez ces étapes :

1. Installer les dépendances avec la commande :
   ```sh
   npm install
   ```
2. Compiler le projet TypeScript en JavaScript :
    ```sh
    npm run build
    ```
3. Exécuter les tests unitaires pour s'assurer que tout fonctionne correctement :
    ```sh
    npm test
    ```

Pour utiliser des modules spécifiques dans votre code, vous pouvez les importer en utilisant `require` ou `import` selon votre environnement, par exemple :
```js
const { call, parser, messages, ResponseInterface } = require('private_modules');
// ou avec ES modules
import { call, parser, messages, ResponseInterface } from 'private_modules';
```