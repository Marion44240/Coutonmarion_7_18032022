const fs = require('fs');
const db = require('../models');

exports.createPost = (req, res, next) => {
    let imagePost = '';
    if (req.file) {
        imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    db.Post.create({
        userId: req.body.userId,
        description: req.body.description,
        image: imagePost,
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch((error) => res.status(400).json(error, 'Requête non autorisé'));   
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({ where: { id: req.params.id } })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
    db.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: db.User
        }]
    })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
};

exports.deletePost = (req, res, next) => {
};
