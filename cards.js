'use strict';

const FS = require('fs');
const uuid = require('uuid');
const JSON_PATH = 'D:/Computer Programming Files/Javascript/ExpressJS/Gwent/gwent.json';


//create('earth elemental', 'mo', 'si', 6);
//create('botchling', 'mo', 'me', 4);
//create('cockatrice', 'mo', 'ra', 6);

//deleteCard('cockatrice');


/**Initializing cards in the database
     * @param {String} name    Name of the card
     * @param {String} faction 2-letter abbreviated representing card's faction
     * @param {String} range   2-letter abbreviated representing card's range of attack
     * @param {Number} strenth Card's attack strength
     * @param {String} special [Card's special ability]
     */

function create(card) {
    let newCard = {
        'id': uuid.v4(),
        'name': card.name.toLowerCase(),
        'faction': getFaction(card.faction),
        'range': getRange(card.range),
        'strength': card.strength,
        'special': (card.special) ? card.special : 'n/a'
    }
    updateCard(undefined, newCard);
};

/**
 * Reads the JSON file and returns an array of all the cards
 * @return {Array of JSON objects}           Array of JSON objects
 */

function getAll() {
    let rawData = FS.readFileSync(JSON_PATH);
    let data = JSON.parse(rawData);
    return data;
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
 * @param {String} cardId    Unique ID of card
 * @param {Object} cardInfo  Information of card to be added to the JSON file 
 */

function updateCard(cardId, cardInfo) {
    let arrayOfObjects = getAll(JSON_PATH);
    let found = arrayOfObjects.find((element) => {
        if(typeof(cardInfo) === 'undefined'){
            if(element['id'] === cardId){
                return element;
            }
        } else if(typeof(cardId) === 'undefined') {
            if (element['name'] === cardInfo['name']  ) {
                return element;
            }
        }
    });

    if (found) {
        console.log(`Card '${found['name']}' found. Updating...`);
        let oldId = found['id'];
        Object.assign(found, cardInfo);
        found['id'] = oldId;
    }
    else {
        console.log (`Adding card '${cardInfo['name']}'...`);
        arrayOfObjects.push(cardInfo);
    }
    writeCardData(arrayOfObjects);
};

/**
 * Edit the JSON file
 * @param {Object} cardInfo   Information of card to be added to the JSON file
 * @param {String} nameOfCard Name of card to be added, for user experience
 */

function writeCardData(cardInfo) {
    FS.writeFileSync(JSON_PATH, JSON.stringify(cardInfo, null, 5));
    console.log(`Database was updated successfully \n`);
};



/**
 * Read the JSON file but returns only the card requested
 * @param   {String} idCardToGet  id of the card to get
 * @returns                     String value of the card if found, error if not 
 */

function getOne(idOfCardToGet) {
    let arrayOfObjects = getAll(JSON_PATH);
    let cardFound = arrayOfObjects.filter(card => card['id'] === idOfCardToGet);

    if (cardFound.length > 0) {
        return cardFound;
    }
    else {
        return 'Card not found';
    }
};

/**
 * Delete card from Jsvascript object and then call the function to update the JSON database
 * @param {String} IdCardToRemove Unique ID of card to remove
 * 
 */

function deleteCard(IdCardToRemove) {
    let arrayOfObjects = getAll(JSON_PATH);
    let found = arrayOfObjects.find(function (element) {
        if (element['id'] === IdCardToRemove) {
            return element;
        }
    });

    if (found) {
        let index = getIndex(arrayOfObjects, found['id']);
        console.log(`Card '${found['name']}' found. Removing...`);
        arrayOfObjects.splice(index, 1);
        writeCardData(arrayOfObjects);
    }
    else {
        console.log(`Card '${IdCardToRemove}' does not exist.`);
    }

};

/**
 * get position of an object in an array of objects
 * @param   {Array of Objects} arrayOfObjects Array of Objects
 * @param   {String}           id             Unique ID of object to look for in the array
 * @returns                                   Index of the object element  
 */

function getIndex(arrayOfObjects, id) {
    for (let i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i]['id'] === id) {
            return i;
        }
        else if (i === arrayOfObjects.length && arrayOfObjects[i]['name'] !== elementValue) {
            return `Card '${elementValue}' not found`;
        }
    }
};



module.exports = {
    create,
    getAll,
    getOne,
    updateCard,
    deleteCard
};
