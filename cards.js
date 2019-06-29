"use strict";

const FS = require("fs");
const uuid = require("uuid");
const JSON_PATH =
  "D:/Computer Programming Files/Javascript/ExpressJS/Gwent/gwent.json";

/**Initializing cards in the database
 * @param {String} name    Name of the card
 * @param {String} faction 2-letter abbreviated representing card's faction
 * @param {String} range   2-letter abbreviated representing card's range of attack
 * @param {Number} strenth Card's attack strength
 * @param {String} special [Card's special ability]
 */

function create(card) {
  let newCard = {
    id: uuid.v4(),
    name: card.name.toLowerCase(),
    faction: card.faction,
    range: card.range,
    strength: card.strength,
    special: card.special ? card.special : "n/a"
  };
  updateCard(undefined, newCard);
}

/**
 * Reads the JSON file and returns an array of all the cards
 * @return {Array of JSON objects}           Array of JSON objects
 */

function getAll() {
  let rawData = FS.readFileSync(JSON_PATH);
  let data = JSON.parse(rawData);
  return data;
}

/**
 * Update the Javscript object before calling the function to write it to JSON file
 * @param {String} cardId    Unique ID of card
 * @param {Object} cardInfo  Information of card to be added to the JSON file
 */

function updateCard(cardId = undefined, cardInfo) {
  let arrayOfObjects = getAll(JSON_PATH);
  let found = arrayOfObjects.find(element => {
    if (element["id"] === cardId) {
      return element;
    } else if (element["name"] === cardInfo["name"]) {
      return element;
    }
  });

  if (found) {
    console.log(`Card '${found["name"]}' found. Updating...`);
    let oldId = found["id"];
    Object.assign(found, cardInfo);
    found["id"] = oldId;
    writeCardData(arrayOfObjects);
  } else {
    console.log(`Adding card '${cardInfo["name"]}'...`);
    arrayOfObjects.push(cardInfo);
    writeCardData(arrayOfObjects);
  }
}

/**
 * Edit the JSON file
 * @param {Object} cardInfo   Information of card to be added to the JSON file
 * @param {String} nameOfCard Name of card to be added, for user experience
 */

function writeCardData(cardInfo) {
  FS.writeFileSync(JSON_PATH, JSON.stringify(cardInfo, null, 5));
  console.log(`Database was updated successfully \n`);
}

/**
 * Read the JSON file but returns only the card requested
 * @param   {String} idCardToGet  id of the card to get
 * @returns                     String value of the card if found, error if not
 */

function getOne(idOfCardToGet) {
  let arrayOfObjects = getAll(JSON_PATH);
  let cardFound = arrayOfObjects.filter(card => card["id"] === idOfCardToGet);

  if (cardFound.length > 0) {
    return cardFound;
  } else {
    return "Card not found";
  }
}

/**
 * Delete card from Jsvascript object and then call the function to update the JSON database
 * @param {String} IdCardToRemove Unique ID of card to remove
 *
 */

function deleteCard(IdCardToRemove) {
  let arrayOfObjects = getAll(JSON_PATH);
  let found = arrayOfObjects.find(function(element) {
    if (element["id"] === IdCardToRemove) {
      return element;
    }
  });

  if (found) {
    let index = getIndex(arrayOfObjects, found["id"]);
    console.log(`Card '${found["name"]}' found. Removing...`);
    arrayOfObjects.splice(index, 1);
    writeCardData(arrayOfObjects);
  } else {
    console.log(`Card '${IdCardToRemove}' does not exist.`);
  }
}

/**
 * get position of an object in an array of objects
 * @param   {Array of Objects} arrayOfObjects Array of Objects
 * @param   {String}           id             Unique ID of object to look for in the array
 * @returns                                   Index of the object element
 */

function getIndex(arrayOfObjects, id) {
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i]["id"] === id) {
      return i;
    } else if (
      i === arrayOfObjects.length &&
      arrayOfObjects[i]["name"] !== elementValue
    ) {
      return `Card '${elementValue}' not found`;
    }
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  updateCard,
  deleteCard
};
