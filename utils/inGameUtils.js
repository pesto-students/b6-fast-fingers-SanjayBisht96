import data from '../public/data/dictionary.json';
import { DiffFactorToDiffLevel, wordLengthLimit,diffFactorIncrement, counterMiliSecSpeed, endGameUrl } from '../components/consts';

const getWord = (minLength, maxLength) => { 
    let randomWord = data[Math.floor(Math.random() * data.length)];
    while(randomWord.length < minLength || randomWord.length > maxLength){
      randomWord = data[Math.floor(Math.random() * data.length)];
    }
    return randomWord.toUpperCase();
  }

const newWord = (diffLevel,diffFactor) => {
    const [minLength, maxLength] = wordLengthLimit[diffLevel];
    document.getElementById("playerInput").focus();
    let randomWord = getWord(minLength, maxLength);   
    let gameCharList = document.getElementById("word").children;
    for( let ele of gameCharList){
      ele.classList.remove("matched");
    }
    document.getElementById('playerInput').value = '';
    return randomWord;
  }

const matchWord = () => {
    if(!document.getElementById('playerInput')) return false;

    let playerInput = document.getElementById('playerInput').value;
    let gameCharList = document.getElementById("word").children;
    let charMatch = true;
    if(playerInput.match(/[^A-Za-z]/gi)){
      playerInput = playerInput.replace(/[^A-za-z]/gi,'');
      document.getElementById('playerInput').value = playerInput;
    }
    playerInput = playerInput.toUpperCase();
    document.getElementById('playerInput').value = playerInput;
    for( let ele of gameCharList){ 
      ele.classList.remove("matched");
    }
    if(playerInput.length > gameCharList.length) return false;
    playerInput.split('').map((character,index) => {
      if(character === gameCharList[index].innerText && charMatch){
        gameCharList[index].classList.add("matched");
      }else{
        charMatch = false;
      }
    });

    if(playerInput.length !== gameCharList.length) return false;

    return charMatch;
  }

export {
    getWord,
    newWord,
    matchWord
}