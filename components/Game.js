import styles from '../styles/Game.module.css';
import Router from 'next/router';
import UserContext from '../components/UserContext';
import { useContext, useState, useEffect } from 'react';
import data from '../public/data/dictionary.json';
import { DiffFactorToDiffLevel, wordLengthLimit,diffFactorIncrement, counterMiliSecSpeed } from '../components/consts';

export default function Game() {
  const [time, setTime] = useState(1);
  const { updateScore, resetScore, getFormattedTime, updateDiffFactor, updateDiffLevel } = useContext(UserContext);
  const { score, diffFactor,diffLevel } = useContext(UserContext);
  const [word, setWord ] = useState('');
  
  useEffect(() => {
    resetScore();
    newWord();
  },[])

  useEffect(() => {
    let interval = null;
    if (time>0) {
      interval = setInterval(() => {
        updateScore();
        if(time > counterMiliSecSpeed) { 
          setTime(time => time - counterMiliSecSpeed); 
        } else {
          setTime(time => 0);
        }
        let charMatched = matchWord();
        if(charMatched)newWord();  
      }, 1);
    } else if ( time == 0) {
      clearInterval(interval);
      let charMatched = matchWord();
      if(charMatched){
        newWord();
      }else{
        let scoreList = [];
        if(localStorage.getItem("userScoreList")){
          const retrievedList = JSON.parse(localStorage.getItem("userScoreList"));
          scoreList = [...retrievedList];
        }
        scoreList = [...scoreList, score];
        localStorage.setItem("userScoreList", JSON.stringify(scoreList));
        Router.push("/game-over");
      }
    }
    return () => clearInterval(interval);
  }, [ time ]);


  const newWord = () => {
    updateDiffFactor(parseFloat(localStorage.getItem('diffFactor')) ,diffFactorIncrement);
    updateDiffLevel(localStorage.getItem('diffLevel'));
    if(DiffFactorToDiffLevel[diffFactor]){
      updateDiffLevel(DiffFactorToDiffLevel[diffFactor]);
      localStorage.setItem('diffLevel', diffLevel);
    }
    const [minLength, maxLength] = wordLengthLimit[diffLevel];
    document.getElementById("playerInput").focus();
    let randomWord = getWord(minLength, maxLength);
    setWord(randomWord);
    let timeInMillisec = Math.ceil((randomWord.length/diffFactor) * 1000);
    setTime(timeInMillisec);
    let gameCharList = document.getElementById("word").children;
    for( let ele of gameCharList){
      ele.classList.remove("matched");
    }
    document.getElementById('playerInput').value = '';
  }


  const getWord = (minLength, maxLength) => { 
    let randomWord = data[Math.floor(Math.random() * data.length)];
    while(randomWord.length < minLength || randomWord.length > maxLength){
      randomWord = data[Math.floor(Math.random() * data.length)];
    }
    return randomWord;
  }


  const matchWord = () => {
    if(!document.getElementById('playerInput')) return false;

    let playerInput = document.getElementById('playerInput').value;
    let gameCharList = document.getElementById("word").children;
    let charMatch = true;
    if(!playerInput.match(/[^a-z]/gi)){
      playerInput.replace(/[^a-z]/gi,'');
      document.getElementById('playerInput').value = playerInput;
    }
    console.log(playerInput);
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


    return  (<div className={styles.game}>
                <div className={styles.countDownTime}>{ getFormattedTime(time) }</div>
                <div id='word' className={styles.matchText}>{ word.split('').map((character,index) => (
                  <span key={index}>{character}</span>
                )) }</div>
                <input id='playerInput' className={styles.enterWord} onChange={matchWord}></input>
            </div>
     )
  }