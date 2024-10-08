const mongoose = require('mongoose');

const Post = mongoose.model('Post', { 
    title: String,
    author: String,
    description: String,
    createDate: String,
    updateDate: String
});

module.exports = Post;