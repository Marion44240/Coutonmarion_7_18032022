// Importation Express
const express = require('express');
const app = express();

// Importation module helmet pour sécurisé les en-têtes HTTP
const helmet = require('helmet');
app.use(helmet());

// Importation dotenv (variable d'environement)
require('dotenv').config();

// Importation MySQL
const sequelize = require('./config/db.config');

// CORS, système de sécurité qui bloque les appels HTTP entre des serveurs différents ce qui empêche les requêtes malveillantes d'accéder à des resources sensibles
const cors = require('cors');
app.use(cors());

// Analyse le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Bienvenu sur l'application" });
});

module.exports = app;