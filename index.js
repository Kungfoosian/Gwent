'use strict';

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const cards = require('./cards.js');
const bodyParser = require('body-parser');

// Middleware
// app.use(bodyParser());
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
})

app.get('/cards', (req, res) => {
    res.json(cards.getAll());
});

app.get('/cards/:id', (req, res) => {
    res.json(cards.getOne(req.params.id));
});

//Creating cards
app.post('/cards', (req, res) => {
    let errors = preCheck(req.body);

    //Results
    if (errors.length > 0) {
        res.status(400).json({ 'msg': 'Please fix the following error(s):', 'errors': errors });
    } else {
        res.json(cards.create(req.body));
    }
});

//Update card
app.put('/cards/:id', (req, res) => {
    let errors = preCheck(req.body);

    if (errors.length > 0) {
        res.status(400).json({ 'msg': 'Please fix the following error(s):', 'errors': errors });
    }
    else {
        res.json(cards.updateCard(req.params.id, req.body));
    }

});

//Delete card
app.delete('/cards/:id', (req, res) => {
    res.json(cards.deleteCard(req.params.id));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



//Precheck and input error handling
const preCheck = (object) => {
    let errors = [];
    Object.keys(object).forEach((key) => {
        if (key === 'name') {
            if (!object['name'] || !isNaN(object['name'])) {
                errors.push('Name must be a string, no numbers');
            }
        } else if (key === 'faction') {
            if (!object['faction'] || !isNaN(object['faction']) || object['faction'].length !== 2) {
                errors.push('Faction must be a two character string, no numbers');
            }
        } else if (key === 'range') {
            if (!object['range'] || !isNaN(object['range']) || object['range'].length !== 2) {
                errors.push('Range must be a two character string, no numbers');
            }
        } else if (key === 'strength') {
            if (!object['strength'] || isNaN(object['strength']) || object['strength'] < 1 || object['strength'] > 10) {
                errors.push('Strength must be a number from 1 to 10');
            }
        }
    });
    return errors;
}
