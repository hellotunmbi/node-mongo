'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let contacts = require('./data');

app.get('/api', (request, response) => {
    response.json({ message: 'You successfully connected.'})
});

/* Get list of all contacts */
app.get('/api/contacts', (request, response) => {
    if(!contacts) {
        response.status(404).json({ message: "No contacts found"});
    }
    
    response.json(contacts);
});


/* Get single contact */
app.get('/api/contacts/:id', (request, response) => {
    
    const requestId = request.params.id;

    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    });

    if(contact.length < 1) {
        response.status(404).json({ message: "This contact cannot be found"});
    }

    response.json(contact[0]);
});



const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server start on: http://${hostname}:${port}`)
});

