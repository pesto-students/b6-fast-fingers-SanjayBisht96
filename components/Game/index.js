import styles from '../../styles/Game.module.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import  useDifficulty from '../../hooks/useDifficulty';
import  useWord from '../../hooks/useWord';
import { diffFactorIncrement } from '../../utils/consts';

const Clock = dynamic(() => import('../Clock'));
const TextBox = dynamic(() => import('../TextBox'));
const Word = dynamic(() => import('../Word'));

export default function Game({time,setTime,setTimerOn}) {
  const { diffLevel, diffFactor, setDiffValues } = useDifficulty();

  const getTimeLimit = (newWord) => {
    setDiffValues(diffFactor + diffFactorIncrement);
    let wordTimeLimit = Math.ceil( newWord.length / diffFactor)*1000;
    return wordTimeLimit;
  }

  const onMatch = (newWord) => {
    setWord(word => newWord);
  }

  const { word, setWord, input, setInput } = useWord(diffLevel,onMatch);

  useEffect(()=>{
    console.log(diffFactor);
    setTime(time => getTimeLimit(word));
   setTimerOn(timerOn => true);
  },[word])


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