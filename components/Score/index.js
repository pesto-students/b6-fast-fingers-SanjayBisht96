import styles from '../../styles/Game.module.css';
import { useEffect,useRef } from 'react';
import getFormattedTime from '../../utils/getFormattedTime';

export default function Score({score,timerOn=false,scoringOn,setScoringOn}) {

    useEffect(()=>{
      if(timerOn || scoringOn) {
        setScoringOn(scoringOn => timerOn);
      }
    },[timerOn,scoringOn])

    return  (<div className={styles.score}>
                <div className={styles.text + ' ' + styles.userScore}>Score: </div>
                <div className={styles.text}>{ getFormattedTime(score) }</div>
            </div>
    )
  }