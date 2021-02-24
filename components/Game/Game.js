import styles from '../../styles/Game.module.css';
import Router from 'next/router';
import { useState, useEffect,useRef    } from 'react';
import getFormattedTime from '../../utils/getFormattedTime';
import {useSelector, useDispatch} from 'react-redux';
import {incrementScore,resetScore} from '../../redux/actions/scoreAction';
import { DiffFactorToDiffLevel, wordLengthLimit,diffFactorIncrement, counterMiliSecSpeed, endGameUrl } from '../consts';
import { newWord, matchWord } from '../../utils/inGameUtils';
import dynamic from 'next/dynamic';


const Clock = dynamic(() => import('../../components/Clock'));

export default function Game() {
  //const {time, setTime, getFormattedTime, updateScore, resetScore , updateDiffFactor,updateDiffLevel} = useContext(ScoreContext);
  //const { score, diffFactor,diffLevel } = useContext(ScoreContext);
  const [word, setWord ] = useState('');
  //const [time, setTime] = useState(0);
  const [diffFactor, setDiffFactor] = useState(1);
  const [diffLevel, setDiffLevel] = useState("Easy");
  const timer = useRef(null);
  const time = useRef(0);
  const score = useSelector(state => state.score.score);
  const dispatch = useDispatch();

  
  const updateTimer = (randomWord) => {
    let timeInMillisec = Math.ceil((randomWord.length/diffFactor) * 1000);
    console.log(timeInMillisec);
    time.current = timeInMillisec;
  }


  const updateDiffFactor = () =>{
    setDiffFactor( diffFactor => parseFloat(localStorage.getItem('diffFactor')) + diffFactorIncrement);
    localStorage.setItem('diffFactor',diffFactor);
    setDiffLevel(localStorage.getItem('diffLevel'));
    if(DiffFactorToDiffLevel[diffFactor]){
      setDiffLevel(DiffFactorToDiffLevel[diffFactor]);
      localStorage.setItem('diffLevel', diffLevel);
    }
  }

  useEffect(() => {
    setDiffFactor(diffFactor => localStorage.getItem("diffFactor"));
    setDiffLevel(diffLevel => localStorage.getItem("diffLevel"));
    dispatch(resetScore());
    updateDiffFactor();
    let randomWord = newWord(diffLevel,diffFactor);
    setWord(word => randomWord);
    updateTimer(randomWord);
    
    timer.current = setInterval(() => {
      console.log(score);
      dispatch(incrementScore());
      if(time.current > counterMiliSecSpeed) { 
        time.current = time.current - counterMiliSecSpeed; 
      } else {
        time.current = 0;
      }
      let charMatched = matchWord();
      if(charMatched){
        updateDiffFactor();
        let randomWord = newWord(diffLevel,diffFactor);
        setWord(word => randomWord);
        updateTimer(randomWord);
      }
    }, counterMiliSecSpeed);
    console.log(timer.current);
    
  },[])

  useEffect(() => {
    if ( time.current == 0 || time.current<0) {
      clearInterval(timer.current);
      console.log(timer.current);
      localStorage.setItem("currentScore",score);
      let charMatched = matchWord();
      if(charMatched){
        updateDiffFactor();
        let randomWord = newWord(diffLevel,diffFactor);
        setWord(word => randomWord);
        updateTimer(randomWord);
      }else{
        let scoreList = [];
        if(localStorage.getItem("userScoreList")){
          const retrievedList = JSON.parse(localStorage.getItem("userScoreList"));
          scoreList = [...retrievedList];
        }
        scoreList = [...scoreList, score];
        localStorage.setItem("userScoreList", JSON.stringify(scoreList));
        Router.push(endGameUrl);
      }
    }
  }, [ time ]);





    return  (<div className={styles.game}>
                <Clock time={time.current}/>
                <div id='word' className={styles.matchText}>{ word.split('').map((character,index) => (
                  <span key={index}>{character}</span>
                )) }</div>
                <input id='playerInput' className={styles.enterWord} onChange={matchWord} autoComplete="off"></input>
            </div>
     )
  }