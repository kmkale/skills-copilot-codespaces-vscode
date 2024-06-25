// Create web server

const express = require('express');
const comments = require('./comments.json');

const app = express();

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found.');
    }
    res.json(comment);
});

app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.json(comment);
});

// create server and start listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
