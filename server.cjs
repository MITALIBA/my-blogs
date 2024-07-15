const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');



const app = express();
const PORT = 3000;

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(express.static('public'));



app.get('/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file.');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(COMMENTS_FILE, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments file.');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing comments file.');
            }
            res.status(201).json(req.body);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
