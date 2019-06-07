'use strict';

const FS = require('fs');
const NEW_JSON_PATH = 'D:/Computer Programming Files/Javascript/ExpressJS/Exercise/gwent.json';

//INITIALIZING CARDS
initCard('Earth Elemental', 'mo', 'si', 6);
//initCard('Botchling', 'mo', 'me', 4);
//initCard('Cockatrice', 'mo', 'ra', 6);



//Function to initialize card
function initCard(name, faction, range, strength, special = 'n/a') {
    let card = {
        'name': name,
        'faction': getFaction(faction),
        'range': getRange(range),
        'strength': strength,
        'special': special
    }
    addCard(NEW_JSON_PATH, card);
};

//Function to return card's faction
function getFaction(value) {
    switch (value.toLowerCase()) {
        case 'nr':
            return 'Northern Realms';
        case 'ni':
            return 'Nilfgaardian';
        case 'mo':
            return 'Monsters';
        case 'sk':
            return 'Skellige';
        default:
            return 'N/a';
    };
};
//Function to return card's combat range
function getRange(value) {
    switch (value.toLowerCase()) {
        case 'me':
            return 'Melee';
        case 'ra':
            return 'Ranged';
        case 'si':
            return 'Siege';
        default:
            return 'N/a';
    };
};



//Edit the JSON file
function addCard(givenPath, cardInfo) {
    let arrayOfObjects = readCardData(givenPath);

    //checks if the object we want to add already exists
    let found = arrayOfObjects.find(function (element) {
        if (element['name'] === cardInfo['name']) {
            return element;

        }
    });

    if (found) {
        console.log('Card found. Updating...')
        Object.assign(found, cardInfo);
    }
    //push if not
    else {
        arrayOfObjects.push(cardInfo);
    }

    //write the new info to JSON file
    FS.writeFileSync(givenPath, JSON.stringify(arrayOfObjects, null, 5));
    console.log('Card added successfully');
}

//Read card data
function readCardData(givenPath) {
    let rawData = FS.readFileSync(givenPath);
    let data = JSON.parse(rawData);
    //console.log(data);
    return data;
}