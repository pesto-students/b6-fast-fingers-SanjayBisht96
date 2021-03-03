import styles from './index.module.css';
import { useEffect, useState } from 'react';
import getFormattedTime from '../../utils/getFormattedTime';
import { getFromStorage } from '../../utils/localStorage';

export default function ScoreBoard(){

  const [maxScoreIndex ,setMaxScoreIndex ] = useState(-1);
  const [retrievedList, setRetrievedList] = useState([]);

  useEffect(() => {
    if(getFromStorage("scoreList")){
      let list = JSON.parse(getFromStorage("scoreList"));
      setRetrievedList( retrievedList => list);
      setMaxScoreIndex(maxScoreIndex => list.indexOf(Math.max(...list)));
    }
  },[]);

    return  (
            <div className={styles.scoreBoard}>
                <div className={styles.text}>Score Board</div>
                <div id='scoreList' className={styles.title}>
                  { retrievedList &&
                  retrievedList.map((score,index) => (
                    <div  key={index} className={styles.scoreList}>
                      <div className={styles.scoreText}>Game { index+1 }: { getFormattedTime(score) }</div>
                      {  maxScoreIndex == index &&
                       <div className={styles.personalBestText}>Personal Best!</div>
                      }                      
                  </div>
                ))}
                </div>
            </div>
    )
  }