import styles from '../../styles/Game.module.css';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { inGameUrl } from '../../utils/consts';
import getFormattedTime from '../../utils/getFormattedTime';
import { getFromStorage,addToStorage } from '../../utils/localStorage';
import dynamic from 'next/dynamic';
import { getScore } from '../../utils/callApi';

const Button = dynamic(() => import('../Button')); 

export default function EndGame({score,userName}) {
    const [maxScore ,setMaxScore ] = useState(-1);
    const continueGame = () => {
        Router.push(inGameUrl);
    }
    useEffect(() => {
        async function getMaxScore(){
            let list = await getScore(userName);
            if(list){
                setMaxScore(maxScore => Math.max(...list));
            }
        }
        getMaxScore();
    },[maxScore]);
  

    return  (<div className={styles.endGame}>
                <div className={styles.endText}>Game Over!<br/><br/>Your Score</div>
                <div className={styles.endText}>{ getFormattedTime(score) }</div>
                { 
                    score >= maxScore ?
                    <div className={styles.endText}>High Score!</div> :null
                }
                    <Button 
                        clickFunction={continueGame}
                        styleClass={"restartGame"}
                        imgSrc={'/assets/replay.png'}
                        altText={"Play Again"}
                        imgClass={"replayImg"}
                        textClass={"replayText"}
                        ButtonText={"Play Again"}
                    />                    
            </div>
    )
  }