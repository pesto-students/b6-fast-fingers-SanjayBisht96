import styles from '../styles/Game.module.css'
import { useEffect } from 'react';
import Router from 'next/router';
import { endGameUrl } from '../utils/consts';
import dynamic from 'next/dynamic';
import useTime from '../hooks/useTime'
import useUserName from '../hooks/useUserName';
import useScore from '../hooks/useScore';
import authPage from '../utils/authPage';
import { getFromStorage,addToStorage } from '../utils/localStorage';
import { saveScore } from '../utils/callApi';


const Header = dynamic(() => import('../components/Header'));
const Logo = dynamic(() => import('../components/Logo'));
const Level = dynamic(() => import('../components/Level'));
const ScoreBoard = dynamic(() => import('../components/ScoreBoard'));
const Score = dynamic(() => import('../components/Score'));
const Game = dynamic(() => import('../components/Game'));
const Button = dynamic(() => import('../components/Button')); 

export default function InGame() {

    const {time, setTime, timerOn, setTimerOn } = useTime(0);
    const {score, setScore, scoreList, setScoreList, scoringOn, setScoringOn } = useScore(true,0);
    const { userName } = useUserName();

    const stopGame = () => {
         setTime(0);
         setTimerOn(timerOn => false);
         let retrievedList = JSON.parse(getFromStorage("scoreList"));
         if(Array.isArray(retrievedList) && retrievedList.length >0) {
           retrievedList = [...retrievedList,score];
         }else{
            retrievedList = [score];
         }
         setScoreList(scoreList => retrievedList);
         addToStorage("scoreList",JSON.stringify(retrievedList));
         saveScore(userName,score);
         addToStorage("score",score); 
         Router.push(endGameUrl);
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Logo 
                        logoClass={"logoGameContainer"}
                        imgSrc={"/assets/keyboard.png"}
                        alt={"Fast Finger Logo"}
                        imgClass={"smallLogo"}
                        textClass={"gameLogoText"}
                        text={"Fast Fingers"}
                    />
                    <Level/>
                    <ScoreBoard 
                        userName={userName}
                        scoreList={scoreList}
                    />
                    <Button 
                        time={time} 
                        clickFunction={stopGame}
                        styleClass={"stopGame"}
                        imgSrc={'/assets/stop.png'}
                        altText={"Stop Game"}
                        imgClass={"stopImg"}
                        textClass={"stopText"}
                        ButtonText={"Stop Game"}
                    />
                </div>
                <div className={styles.middle}>
                    <Game 
                        time={time} 
                        setTime={setTime} 
                        timerOn={timerOn}
                        setTimerOn={setTimerOn}
                        setScoringOn={scoringOn}
                        stopGame={stopGame}
                    />
                </div>
                <div className={styles.right}>
                    <Logo 
                        logoClass={"userLogoContainer"}
                        imgSrc={"/assets/userLogo.png"}
                        alt={"User Logo"}
                        imgClass={"smallLogo"}
                        textClass={"userLogoText"}
                        text={userName}
                    />
                    <Score 
                        score={score} 
                        setScore={setScore}
                        scoreList={scoreList}
                        setScoreList={setScoreList}
                        timerOn={timerOn}
                        scoringOn={scoringOn}
                        setScoringOn={setScoringOn}
                    />
                </div>
            </div>
    </>
    )
}
