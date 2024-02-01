// importing json data from games.js
import GAMES_DATA from './games.js'

// creating a list that stors game information
const GAMES_JSON=JSON.parse(GAMES_DATA);

// remove all child element from  parent 

function deleteChildElement(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

// add data about each game as a card in games container

const gamesContainer=document.getElementById("games-conainer");

function addGamesToPage(games){
    for(let i=0;i<games.length;i++){
        const gameCard=document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML=`
        <h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        <p>Pledged: ${games[i].pledged}</p>
        <p>Goal:${games[i].goal}</p>
        <p>Backers:${games[i].backers}</p>
        <img src="${games[i].img}" alt="img not found" class="game-img" /> 

        `;
        gamesContainer.appendChild(gameCard);
    }
    
}
addGamesToPage(GAMES_JSON);


// Create the summary statistics at the top of the page displaying the
// * total number of contributions, amount donated, and number of games on the site

const contributionCard=document.getElementById("num-contributions");
const totalContributions=GAMES_JSON.reduce((acc,games)=>acc +games.backers,0);
contributionCard.innerHTML=`${totalContributions.toLocaleString()}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised=GAMES_JSON.reduce((acc,game)=>acc+game.pledged,0);

raisedCard.innerHTML=`$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML=GAMES_JSON.length;


// Select & display the top 2 games

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
const sortedGames=GAMES_JSON.sort((item1,item2)=>{
    return item2.pledged-item1.pledged;
});
const [topGame,runnerUpGame,...others]=sortedGames;

const topGameElement=document.createElement("p");
topGameElement.textContent=`The top funded game is ${topGame.name}`;

firstGameContainer.appendChild(topGameElement);

const runnerUpGameElement=document.createElement("p");
runnerUpGameElement.textContent=`The second most funded game is: ${runnerUpGame.name}`;
secondGameContainer.appendChild(runnerUpGameElement);


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElement(gamesContainer);

    const unfundedGames=GAMES_JSON.filter(x=>x.pledged<x.goal);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(unfundedGames.length);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElement(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames=GAMES_JSON.filter(x=>x.pledged>=x.goal);
    

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    console.log(fundedGames.length);


}

// show all games
function showAllGames() {
    deleteChildElement(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);