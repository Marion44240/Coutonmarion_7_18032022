const db = require('../models');

exports.createComment = (req, res, next) => { 
    db.Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch((error) => res.status(400).json(error, 'Requête non autorisé'));
};

exports.getAllComment = (req, res, next) => {
    db.Comment.findAll({
        order: [["createdAt", "ASC"]],
        include: [{ model: db.User }],
    })
        .then((comment) => res.status(200).json(comment))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  db.Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
        comment.destroy()
          .then(res.status(200).json({ message: "Votre commentaire est supprimé !" }))
          .catch((error) => res.status(400).json({ error }))
      })
    .catch((error) => res.status(500).json({ error }));
};