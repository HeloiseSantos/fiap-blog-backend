const router = require('express').Router();

const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    return res.send(posts);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    return res.send(post);
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        createDate: req.body.createDate,
        updateDate: req.body.updateDate
    });

    await post.save();
    return res.send(post);
});

router.put('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        createDate: req.body.createDate,
        updateDate: req.body.updateDate
    }, {
        new: true
    });
    return res.send(post);
});

router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.send(post);
});

module.exports = router;