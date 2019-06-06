'use strict';

const FS = require('fs');
const NEW_JSON_PATH = 'D:/Computer Programming Files/Javascript/ExpressJS/Exercise/gwent-2.json';

//INITIALIZING CARDS
//initCard('Earth Elemental', 'mo', 'si', 6);
console.log('');
//initCard('Botchling', 'mo', 'me', 4);
console.log('');
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
    //addCard(NEW_JSON_PATH, card);
    addCard(NEW_JSON_PATH, card);
    //readCardData();
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
    //console.log(arrayOfObjects);

    //checks if the object we want to add already exists
    let indexToOverwrite = checkExistence(arrayOfObjects, cardInfo);
    //console.log(indexToOverwrite);
    //if yes, then overwrite
    if (indexToOverwrite !== false) {
        arrayOfObjects.splice(indexToOverwrite, 1, cardInfo);
    }
    //push if not
    else {
        arrayOfObjects.push(cardInfo);
    }

    //write the new info to JSON file
    FS.writeFile(givenPath, JSON.stringify(arrayOfObjects, null, 5), function (error) {
        if (error);
        console.log('Done.');
    });
    /*
    */
}


//Check if card already exists, if yes, return index to edit card, if not then return false
function checkExistence(arrayOfJSON, cardToCheck) {
    if(arrayOfJSON.length >= 1) {
        for (let i = 0; i < arrayOfJSON.length; i++) {
            if (arrayOfJSON[i]['name'] === cardToCheck['name']) {
                console.log('Data already existed. Overwriting...');
                return i;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
};

//Read card data
function readCardData(givenPath) {
    let rawData = FS.readFileSync(givenPath);
    let data = JSON.parse(rawData);
    //console.log(data);
    return data;
}