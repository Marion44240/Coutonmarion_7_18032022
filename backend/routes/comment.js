// Importation express
const express = require('express');
const router = express.Router();

// Importation du fichier controllers comment
const commentCtrl = require('../controllers/comment');
// Importation middleware auth
const auth = require('../middleware/auth');

//routes
router.post('/', commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/', auth, commentCtrl.getAllComment);

module.exports = router;