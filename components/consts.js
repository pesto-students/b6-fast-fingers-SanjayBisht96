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

const diffFactorIncrement = 0.01;
const counterMiliSecSpeed = 5;

export { DiffFactorToDiffLevel, wordLengthLimit, diffFactorIncrement, counterMiliSecSpeed };