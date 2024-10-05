const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const port = 3000;

const Post = mongoose.model('Post', { 
    title: String,
    author: String,
    description: String,
    createDate: String,
    updateDate: String
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    return res.send(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    return res.send(post);
});

app.post('/posts', async (req, res) => {
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

app.put('/posts/:id', async (req, res) => {
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

app.delete('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.send(post);
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://heloisehssantos:ICbxVAGGRlZSLHgP@fiap-blog-backend.rl2oe.mongodb.net/?retryWrites=true&w=majority&appName=fiap-blog-backend');

    console.log(`App running on port ${port}`);
});