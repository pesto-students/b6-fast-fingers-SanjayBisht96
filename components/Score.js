import styles from '../styles/Game.module.css';
import Image from 'next/image';
import UserContext from '../components/UserContext';
import { useEffect, useContext,useState } from 'react';

export default function Score() {
  const { score, setScore }  = useContext(UserContext);
  const { getFormattedTime } = useContext(UserContext);

  useEffect(() => {
    setScore(localStorage.getItem("currentScore"));
  },[])

    return  (<div className={styles.score}>
                <div className={styles.text + ' ' + styles.userScore}>Score: </div>
                <div className={styles.text}>{ getFormattedTime(score) }</div>
            </div>
    )
  }