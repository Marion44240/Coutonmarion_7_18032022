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
const postRoutes = require('./routes/post');

//Connexion base de donnée
const db = require('./models');
try {
    console.log('Connexion à MySQL réussi !');
} catch (error) {
    console.error('Connexion à MySQL échouée !', error);
}
db.sequelize.sync();

// CORS, système de sécurité qui bloque les appels HTTP entre des serveurs différents ce qui empêche les requêtes malveillantes d'accéder à des resources sensibles
app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// CORS, pour autoriser les images
app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Resource-Policy');
    next();
});

// Analyse le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gére les ressources images de façon statique d'une requête vers le dossier Images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Création et identification utilisateur
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;