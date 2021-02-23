import styles from '../../styles/Game.module.css';
import { useEffect, useContext, useState, memo } from 'react';
import UserContext from '../UserContext';
import getFormattedTime from '../../utils/getFormattedTime';

export default memo(function ScoreBoard(){
  //const { userScoreList, addScoreToList, getFormattedTime } = useContext(UserContext);
  const [maxScoreIndex ,setMaxScoreIndex ] = useState(-1);
  const [retrievedList, setRetrievedList] = useState([]);

  useEffect(() => {
    setRetrievedList(JSON.parse(localStorage.getItem("userScoreList")));
      //addScoreToList(retrievedList);
      if(retrievedList){
        const maxScore = Math.max.apply(Math,retrievedList);
        setMaxScoreIndex(retrievedList.indexOf(maxScore));
      }
  },[]);

    return  (
            <div className={styles.scoreBoard}>
                <div className={styles.text}>Score Board</div>
                <div id='scoreList' className={styles.title}>
                  { retrievedList &&
                  retrievedList.map((score,index) => (
                    <div key={index} className={styles.scoreList}>
                      {  maxScoreIndex == index &&
                       <div className={styles.personalBestText}>Personal Best!</div>
                      }
                      <div className={styles.scoreText}>Game { index+1 }: { getFormattedTime(score) }</div>
                  </div>
                ))}
                </div>
            </div>
    )
  });