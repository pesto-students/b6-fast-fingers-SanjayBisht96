import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import Router from 'next/router';
import { inGameUrl } from '../consts';


export default function EndGame() {
    const { score } = useContext(UserContext);
    const { getFormattedTime,addScoreToList,resetScore } = useContext(UserContext);
    const [maxScore ,setMaxScore ] = useState(-1);
    const continueGame = () => {
        resetScore();
        Router.push(inGameUrl);
    }

    useEffect(() => {
        const retrievedList = JSON.parse(localStorage.getItem("userScoreList"));
        addScoreToList(retrievedList);
        if(retrievedList){
          setMaxScore(Math.max.apply(Math,retrievedList));
        }
    },[]);
  

    return  (<div className={styles.endGame}>
                <div className={styles.endText}>Game Over!<br/><br/>Your Score</div>
                <div className={styles.endText}>{ getFormattedTime(score) }</div>
                { 
                    score > maxScore &&
                    <div className={styles.endText}>High Score!</div>
                }
                <div className={styles.text + ` button`}  onClick={continueGame}>
                    <img 
                        src="/assets/replay.png"
                        alt="Fast Finger Logo"
                        className={styles.imgPlayAgain}                    
                    />
                    Play Again</div>
            </div>
    )
  }