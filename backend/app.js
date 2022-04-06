// Importation Express
const express = require('express');
const app = express();

// Importation module helmet pour sécurisé les en-têtes HTTP
const helmet = require('helmet');
app.use(helmet());

// Importation module node pour le chemin image
const path = require('path');

// Importation routes
const userRoutes = require('./routes/user');

//Connexion base de donnée
const db = require('./models');
try {
    console.log('Connexion à MySQL réussi !');
} catch (error) {
    console.error('Connexion à MySQL échouée !', error);
}
db.sequelize.sync();

// CORS, système de sécurité qui bloque les appels HTTP entre des serveurs différents ce qui empêche les requêtes malveillantes d'accéder à des resources sensibles
const cors = require('cors');
app.use(cors());

// Analyse le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gére les ressources images de façon statique d'une requête vers le dossier Images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Création et identification utilisateur
app.use('/api/auth', userRoutes);

module.exports = app;