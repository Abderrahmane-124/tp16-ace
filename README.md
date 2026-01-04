# TP 16 - Gestion des Comptes Bancaires

Application React avec GraphQL et Apollo Client pour la gestion des comptes bancaires et des transactions.

## 🚀 Technologies

- **React 18** - Framework frontend
- **Apollo Client** - Client GraphQL
- **GraphQL** - Langage de requêtes API
- **Tailwind CSS** - Framework CSS utilitaire

## 📁 Structure du Projet

```
gestion-comptes/
├── public/
│   └── index.html
├── src/
│   ├── apollo/
│   │   └── client.js          # Configuration Apollo Client
│   ├── components/
│   │   ├── CompteList.js      # Liste des comptes
│   │   ├── CreateCompte.js    # Création de compte
│   │   ├── TransactionForm.js # Formulaire de transaction
│   │   └── TransactionList.js # Historique des transactions
│   ├── graphql/
│   │   ├── mutations.js       # Mutations GraphQL
│   │   ├── queries.js         # Requêtes GraphQL
│   │   └── types.js           # Types et énumérations
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation

```bash
cd gestion-comptes
npm install
```

## ▶️ Lancement

```bash
npm start
```

L'application sera accessible sur http://localhost:3000

## 📋 Fonctionnalités

### Gestion des Comptes
- ✅ Création de comptes (Courant/Épargne)
- ✅ Affichage de la liste des comptes
- ✅ Suppression de comptes

### Gestion des Transactions
- ✅ Ajout de dépôts
- ✅ Ajout de retraits
- ✅ Historique des transactions
- ✅ Statistiques (total, dépôts, retraits)

## 🔗 Requêtes GraphQL

### Queries
- `GET_ALL_COMPTES` - Récupérer tous les comptes
- `GET_COMPTE_BY_ID` - Récupérer un compte par ID
- `GET_TOTAL_SOLDE` - Statistiques des soldes
- `GET_ALL_TRANSACTIONS` - Récupérer toutes les transactions
- `GET_TRANSACTION_STATS` - Statistiques des transactions

### Mutations
- `SAVE_COMPTE` - Créer un compte
- `DELETE_COMPTE` - Supprimer un compte
- `ADD_TRANSACTION` - Ajouter une transaction

