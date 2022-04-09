const fs = require('fs');
const db = require('../models');
const post = require('../models/post');

exports.createPost = (req, res, next) => {
    db.Post.create({
        userId: req.body.userId,
        description: req.body.description,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch((error) => res.status(400).json({ error }));   
};