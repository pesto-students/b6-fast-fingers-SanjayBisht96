import styles from '../../styles/Game.module.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import  useDifficulty from '../../hooks/useDifficulty';
import  useWord from '../../hooks/useWord';
import { diffFactorIncrement,secToMilliSec } from '../../utils/consts';

const Clock = dynamic(() => import('../Clock'));
const TextBox = dynamic(() => import('../TextBox'));
const Word = dynamic(() => import('../Word'));

export default function Game({time,setTime,timerOn,setTimerOn,stopGame}) {
  const { diffLevel, diffFactor, setDiffValues } = useDifficulty();

  const getTimeLimit = (newWord) => {
    setDiffValues(diffFactor + diffFactorIncrement);
    let wordTimeLimit = Math.ceil( newWord.length / diffFactor)*secToMilliSec;
    return wordTimeLimit;
  }

  const onMatch = (newWord) => {
    setWord(word => newWord);
  }

  const { word, setWord, input, setInput } = useWord(diffLevel,onMatch);

  useEffect(()=>{
      console.log("y",word);
      if(word !== ''){
        setTime(time => getTimeLimit(word));
        setTimerOn(timerOn => true);
      }
  },[word])

  useEffect(() => {
    if(time <= 0 && timerOn && word !==''){
        stopGame();
    }
  }, [time,timerOn]);




return  (<div className={styles.game}>
                <Clock 
                  time={time} 
                />
                <Word 
                  id={"word"}
                  wordClass={"matchText"}
                  word={word} 
                  matchText={input} 
                  setWord={word}
                />
                <TextBox 
                  id={'playerInput'}
                  textBoxClass={"enterWord"} 
                  text={input}
                  setText={setInput}
                />
            </div>
     )
  }