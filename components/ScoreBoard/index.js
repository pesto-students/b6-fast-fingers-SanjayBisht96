import styles from './index.module.css';
import { useEffect, useState } from 'react';
import getFormattedTime from '../../utils/getFormattedTime';
import { getFromStorage } from '../../utils/localStorage';
import { getScore } from '../../utils/callApi';

export default function ScoreBoard({userName,scoreList}){

  const [maxScoreIndex ,setMaxScoreIndex ] = useState(-1);
  const [retrievedList, setRetrievedList] = useState([]);

  useEffect(() => {
    async function setScoreBoard(){
      let list = await getScore(userName);
      console.log("x");
      console.log(list);
      if(list && list.length !== 0){
        setRetrievedList( retrievedList => list)
        setMaxScoreIndex( maxScoreIndex => list.indexOf(Math.max(...list)));
      }
   }
    setScoreBoard();
  },[scoreList]);

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
