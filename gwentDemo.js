"use strict"

const fs = require("fs");


//INITIALIZING CARDS
initCard('Earth Elemental', 'mo', 'si', 6);
//initCard('Botchling', 'mo', 'me', 4);
//initCard('Cockatrice', 'mo', 'ra', 2);



//Function to initialize card
function initCard (name, faction, range, strength, special = 'n/a') {
    let cardObj = {
        'name'    : name,
        'faction' : getFaction(faction),
        'range'   : getRange(range),
        'strength': strength,
        'special' : special
    }

    writeCardData(cardObj);
    readCardData();
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
//Function to return card's combar range
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



function readCardData() {
    /*
    let rawData = fs.readFileSync("D:/Computer Programming Files/Javascript/ExpressJS/Exercise/card.json");
    let card = JSON.parse(rawData);
    console.log(card);
    */
    //fs.readFile("D:/Computer Programming Files/Javascript/ExpressJS/Exercise/card.json", function (error, rawData) {


    fs.readFile("./gwent.json", function (error, rawData) {

        // No need for a try catch since this is the error handling here
        // try/catch would be for whatever calls this
        if (error) {
            throw error;
        } else {
            let card = JSON.parse(rawData);
            console.log(card);
        }

    });
}

function writeCardData(data) {
    fs.writeFileSync("gwent.json", JSON.stringify(data));
}

console.log("This is the after read call"); // This runs IMMEDIATELY not after the read ;)

