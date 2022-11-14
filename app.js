const express = require('express');
const fs = require('fs');

const userDB = require('./users/users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000');
});

app.get('/users', (req, res) => {
    res.json(userDB);
});

app.get('/users/:userId', (req, res) => {

    const { userId } = req.params;
    res.json(userDB[userId]);
});

app.post('/users', (req, res) => {

    const userInfo = req.body;
    console.log(userInfo);

    res.status(201).json('Created!');

    fs.readdir('./users', (err, files) => {
            for (const file of files) {
                fs.readFile(`./users/${file}`, (err, data) => {
                    const parsedData = JSON.parse(data);
                    console.log(parsedData);
                });
            }
        });
});

app.put('/users', (req, res) => {


});

app.patch('/users', (req, res) => {


});

app.delete('/users', (req, res) => {

});