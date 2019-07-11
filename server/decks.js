"use strict";

const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const DECKS_JSON = path.join(__dirname, "decks.json");
const CARDS_JSON = path.join(__dirname, "cards.json");

/**
 * @param {String} faction of new deck to be created
 */
function createDeck(faction) {
  let newDeck = {
    id: uuid.v4(),
    faction: faction,
    ability: getDeckAbility(faction),
    cards: []
  };

  return newDeck;
}

/**
 * @param {String} faction to get ability
 * @returns ability of faction provided
 */
function getDeckAbility(faction) {
  switch (faction) {
    case "monsters":
      return "One of your units in play is randomly carried over to the next round";
    case "nilfgaardian":
      return "Wins if the round ends in a tie";
    case "northern realms":
      return "Draw a card if you win a round";
    case "scoia'tael":
      return "Chooses who goes first at the start of a round";
    case "skellige":
      return "2 random Unit cards from the graveyard are placed on the battlefield at the start of the third round";
    default:
      return "Can supplement the other decks";
  }
}

/**
 * @param {Object} data of decks to write to the JSON file
 */
function writeData(data) {
  fs.writeFileSync(DECKS_JSON, JSON.stringify(data, null, 2));
  console.log("Data written successfully");
}

/**
 * @returns the JSON array that holds all the deck objects
 */
function getAllDecks() {
  return JSON.parse(fs.readFileSync(DECKS_JSON));
}

/**
 * @param   {String} id of deck object to find
 * @returns the deck object with matching id
 */
function getOneDeck(id) {
  let allDecks = getAllDecks(DECKS_JSON);
  let found = allDecks.find(deck => {
    return deck.id === id ? true : false;
  });

  if (found) return found;
}

function updateDeck() {
  let allDecks = getAllDecks();
  let allCards = JSON.parse(fs.readFileSync(CARDS_JSON));

  allCards.forEach(card => {
    let deckFound = allDecks.find(deck => {
      return deck.faction === card.faction;
    });
    if (deckFound) {
      let cardFound = deckFound.cards.find(cardInDeck => {
        return cardInDeck === card.id;
      });
      //console.log(cardFound);
      if (cardFound) {
        console.log(
          `Card ${card.id} already existed in deck ${deckFound.faction}`
        );
      } else {
        deckFound.cards.push(card.id);
        writeData(allDecks);
      }
    } else {
      let newDeck = createDeck(card.faction);
      newDeck.cards.push(card.id);
      allDecks.push(newDeck);
      writeData(allDecks);
    }
  });
}

function deleteCard(card) {
  let allDecks = getAllDecks();

  //First check what faction is the card
  let foundDeck = allDecks.find(deck => {
    return deck.faction === card.faction;
  });

  //Then go through the cards array of the deck and remove it
  if (foundDeck) {
    let index = getIndex(foundDeck.cards, card.id);
    console.log(
      `Card ${card.id} found from deck ${foundDeck.faction}. Removing...`
    );

    let updateDeck = foundDeck.cards.splice(index, 1);
    Object.assign(foundDeck, updateDeck);

    writeData(allDecks);
  }

  //Now update the entire json file and save it but still save the id
}

function getIndex(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === id) {
      return i;
    }
  }
}

module.exports = {
  updateDeck,
  deleteCard
};
