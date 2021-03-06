const EASY = "Easy";
const MEDIUM = "Medium";
const HARD = "Hard";

const DIFF_OPTIONS = {
    "Easy": 1,
    "Medium": 1.5,
    "Hard": 2
};

const DiffFactorToDiffLevel = {
    1: "Easy",
    1.5: "Medium",
    2: "Hard"
};

const wordLengthLimit = {
    "Easy" : [ 0, 4],
    "Medium": [5, 8],
    "Hard": [8, Infinity]
}

const secToMilliSec = 1000;

const diffFactorIncrement = 0.01;
const counterMiliSecSpeed = 10;

// Routes 
const homeUrl ="/";
const inGameUrl = "/in-game";
const endGameUrl = "/game-over";

export { EASY,MEDIUM,HARD,DIFF_OPTIONS,DiffFactorToDiffLevel, wordLengthLimit, diffFactorIncrement, counterMiliSecSpeed, homeUrl, inGameUrl, endGameUrl, secToMilliSec };