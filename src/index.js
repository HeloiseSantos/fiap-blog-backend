const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const personRoutes = require('../routes/postRoutes');

app.use('/posts', personRoutes);

const port = 3000;

mongoose.connect(
    'mongodb+srv://heloisehssantos:ICbxVAGGRlZSLHgP@fiap-blog-backend.rl2oe.mongodb.net/?retryWrites=true&w=majority&appName=fiap-blog-backend'
)
.then(() => {
    app.listen(port);
})
.catch((err) => console.log(err));