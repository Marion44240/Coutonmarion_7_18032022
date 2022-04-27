// Importation express
const express = require('express');
const router = express.Router();

// Importation du fichier controllers post
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
// Importation multer et auth
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');


//routes
router.post('/',auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/comment', auth, commentCtrl.createPostComment);

module.exports = router;