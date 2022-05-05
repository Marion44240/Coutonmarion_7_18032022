# Groupomania
## Créez un réseau social d’entreprise

---

### Technologie :

* Node.js
* Express.js
* Vue.js
* MySQL
* Sequelize

### Pour lancer et tester l'application :

Clonez le repository github

#### Back-end

1. Dans le dossier backend config/config.json modifier les données en ajoutant vos informations de connexion à votre base de données : 

```
"username": "root"
"password": "Votre mot de passe"
"database": "Nom de votre base de donnée"
```

2. Dans le terminal se placer dans le dossier backend :

Installer les dépendances avec la commande 

```
npm install
```

Lancer le server avec la commande

```
nodemon server
```

3. Le serveur doit fontionner sur http://localhost:3000/

#### Front-end

1. Dans le terminal se placer dans le dossier frontend :

Installer les dépendances avec la commande 

```
npm install
```

Lancer le server avec la commande

```
npm run serve
```

2. Le serveur doit fontionner sur http://localhost:8080/