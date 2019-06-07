'use strict';

const FS = require('fs');
const JSON_PATH = 'D:/Computer Programming Files/Javascript/ExpressJS/Exercise/gwent.json';


//createCard('earth elemental', 'mo', 'si', 6);
//createCard('botchling', 'mo', 'me', 4);
//createCard('cockatrice', 'mo', 'ra', 6);

//deleteCard('cockatrice');




/**Initializing cards in the database
 * @param {String} name    Name of the card
 * @param {String} faction 2-letter abbreviated representing card's faction
 * @param {String} range   2-letter abbreviated representing card's range of attack
 * @param {Number} strenth Card's attack strength
 * @param {String} special [Card's special ability]
 */

function createCard(name, faction, range, strength, special = 'n/a') {
    let card = {
        'name': name.toLowerCase(),
        'faction': getFaction(faction),
        'range': getRange(range),
        'strength': strength,
        'special': special
    }
    updateCard(JSON_PATH, card);
};

/**
 * Get faction of card
 * @param  {String} value 2-letter abbreviation, represents faction of card
 * @return {String}       Fully written out faction            
 */

function getFaction(value) {
    switch (value.toLowerCase()) {
        case 'nr':
            return 'northern realms';
        case 'ni':
            return 'nilfgaardian';
        case 'mo':
            return 'monsters';
        case 'sk':
            return 'skellige';
        default:
            return 'n/a';
    };
};

/**
 * Get attack range of card
 * @param  {String} value 2-letter abbreviation, represents attack range of card
 * @return {String}       Fully written out card's attack range 
 */

function getRange(value) {
    switch (value.toLowerCase()) {
        case 'me':
            return 'melee';
        case 'ra':
            return 'ranged';
        case 'si':
            return 'siege';
        default:
            return 'n/a';
    };
};



/**
 * Update the Javscript object before calling the function to write it to JSON file
 * @param {String} givenPath Pre-defined path to a JSON file 
 * @param {Object} cardInfo  Information of card to be added to the JSON file 
 */

function updateCard(givenPath, cardInfo) {
    let arrayOfObjects = getCards(givenPath);

    let found = arrayOfObjects.find(function (element) {
        if (element['name'] === cardInfo['name']) {
            return element;
        }
    });

    if (found) {
        console.log(`Card '${found['name']}' found. Updating...`);
        Object.assign(found, cardInfo);
    }

    else {
        console.log(`Adding '${cardInfo['name']}'...`)
        arrayOfObjects.push(cardInfo);
    }
    writeCardData(givenPath, arrayOfObjects);
}

/**
 * Edit the JSON file
 * @param {String} givenPath  Pre-defined path to a JSON file 
 * @param {Object} cardInfo   Information of card to be added to the JSON file
 * @param {String} nameOfCard Name of card to be added, for user experience
 */

function writeCardData(givenPath, cardInfo) {
    FS.writeFileSync(givenPath, JSON.stringify(cardInfo, null, 5));
    console.log(`Database was updated successfully \n`);
}

/**
 * Reads the JSON file and returns an array of card objects
 * @param  {String}                givenPath Pre-defined path to a JSON file 
 * @return {Array of JSON objects}           Array of JSON objects
 */

function getCards(givenPath) {
    let rawData = FS.readFileSync(givenPath);
    let data = JSON.parse(rawData);
    return data;
}

/**
 * Read the JSON file but returns only the card requested
 * @param   {String} givenPath  Pre-defined path to a JSON file 
 * @param   {String} cardToGet  Name of the card to get
 * @returns                     String value of the card if found, error if not 
 */

function getCard(givenPath, cardToGet) {
    let arrayOfObjects = getCards(givenPath);
    for (let i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i]['name'] === cardToGet.toLowerCase()) {
            return arrayOfObjects[i];
        }
        else {
            return 'Card not found';
        }

    }
}


/**
 * Delete card from Jsvascript object and then call the function to update the JSON database
 * @param {String} cardToRemove Name of card to remove
 * 
 */

function deleteCard(cardToRemove) {
    let arrayOfObjects = getCards(JSON_PATH);
    let found = arrayOfObjects.find(function (element) {
        
        if (element['name'] === cardToRemove) {
            return element;
        }
    });
    if (found) {
        let index = getIndex(arrayOfObjects, found['name']);
        console.log(`Card '${found['name']}' found. Removing...`);
        arrayOfObjects.splice(index, 1);
        writeCardData(JSON_PATH, arrayOfObjects);
    }
    else{
        console.log(`Card '${cardToRemove}' does not exist.`);
    }
}


/**
 * get position of an object in an array of objects
 * @param   {Array of Objects} arrayOfObjects Array of Objects
 * @param   {String}           elementValue   Value of a key in the object element to look                                              for in the array
 * @returns                                   Index of the object element  
 */

function getIndex(arrayOfObjects, elementValue) {
    for (let i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i]['name'] === elementValue) {
            return i;
        }
        else if (i === arrayOfObjects.length && arrayOfObjects[i]['name'] !== elementValue) {
            return `Card '${elementValue}' not found`;
        }
    }
}