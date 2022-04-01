require('dotenv').config();
// Connexion à la base de données MySQL
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    }
);
try {
    sequelize.authenticate();
    console.log('Connexion à MySQL réussi !');
} catch (error) {
    console.error('Connexion à MySQL échouée !', error);
}

module.exports = sequelize;