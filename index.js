/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    console.log("delete child function accessed \n")
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        console.log ("while loop looping \n")
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

//create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        
        newDiv.innerHTML = `
        <img src="${games[i].img}" class="game-img">
        <h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        `;

        gamesContainer.appendChild(newDiv);
    }
    
}



addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

let totalBackers = GAMES_JSON.reduce ( (acc, game) => { 
    return acc + game.backers;
}, 0);

contributionsCard.innerHTML =  `<p>${totalBackers.toLocaleString(('en-US'))}</p>`;


// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaisedAmount = GAMES_JSON.reduce ( (acc, game) => { 
    return acc + game.pledged;
}, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `<p>${totalRaisedAmount.toLocaleString(('en-US'))}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let numGames = GAMES_JSON.reduce ( (sum, game) => {
    return sum + 1;
},0);

gamesCard.innerHTML = `<p> ${numGames.toLocaleString('en-US')} </p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    console.log("UNfunded button clicked")
    deleteChildElements(gamesContainer);
    console.log (gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfunded = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    })
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded);
    console.log (`unfunded number = ${listOfUnfunded.length}`);

}

// show only games that are fully funded
function filterFundedOnly() {
    console.log("funded button clicked");
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFunded = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    })
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFunded)
    console.log (`funded number = ${listOfFunded.length}`);
    console.log (listOfFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);





/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfundedGames = GAMES_JSON.reduce( (acc, game) => {
    return acc+(game.goal > game.pledged ? 1 : 0);
}, 0) ;

// let totalBackers = GAMES_JSON.reduce ( (acc, game) => { 
//     return acc + game.backers;
// }, 0);


// create a string that explains the number of unfunded games using the ternary operator

const displayStr = 
    `A total of ${totalRaisedAmount.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games.`+ 
    `${numUnfundedGames !== 0? `Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? 
    "game remains unfunded" : 
    "games remain unfunded"}. We need your help funding these amazing games!` : 
    "All of our games are funded fully. Thank you for your support!"}`
;

const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerText = displayStr;

descriptionContainer.appendChild(descriptionParagraph);

console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameDisplayer = document.createElement("p");
firstGameDisplayer.innerText = firstGame.name;
firstGameContainer.appendChild(firstGameDisplayer);

// do the same for the runner up item
let secondGameDisplayer = document.createElement("p");
secondGameDisplayer.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameDisplayer)