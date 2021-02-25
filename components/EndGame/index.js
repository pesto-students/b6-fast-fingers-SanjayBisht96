import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { inGameUrl } from '../consts';
import getFormattedTime from '../../utils/getFormattedTime';
import {useSelector, useDispatch} from 'react-redux';
import {resetScore} from '../../redux/actions/scoreAction';


export default function EndGame() {
    const score = useSelector(state => {return state.score.score});
    const dispatch = useDispatch();
    const [maxScore ,setMaxScore ] = useState(-1);
    const continueGame = () => {
        dispatch(resetScore());
        Router.push(inGameUrl);
    }

    useEffect(() => {
        let retrievedList = JSON.parse(localStorage.getItem("userScoreList"));
        //addScoreToList(retrievedList);
        retrievedList.push(score);
        localStorage.setItem("userScoreList",JSON.stringify(retrievedList));
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