import styles from '../styles/Game.module.css'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { homeUrl } from '../utils/consts';
import useUserName from '../hooks/useUserName';
import useScore from '../hooks/useScore';
import Router  from 'next/router';
import authPage from '../utils/authPage';
import { addToStorage, getFromStorage } from '../utils/localStorage';

const Header = dynamic(() => import('../components/Header'));
const Logo = dynamic(() => import('../components/Logo'));
const Level = dynamic(() => import('../components/Level'));
const ScoreBoard = dynamic(() => import('../components/ScoreBoard'));
const Score = dynamic(() => import('../components/Score'));
const Button = dynamic(() => import('../components/Button')); 
const EndGame = dynamic(() => import('../components/EndGame'));

export default function GameOver() {
    const { userName } = useUserName('');
    const { score, setScore, scoreList,setScoreList, scoringOn } = useScore(false);
    const quitGame = () => {
        let user = getFromStorage("userName");
        localStorage.clear();
        addToStorage("userName",user);
        Router.push(homeUrl);
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
                    clickFunction={quitGame}
                    styleClass={quitGame}
                    imgSrc={'/assets/replay.png'}
                    altText={"Quit Game"}
                    imgClass={"quitImg"}
                    textClass={"quitText"}
                    ButtonText={"Quit Game"}
             />
            </div>
            <div className={styles.middle}>
                <EndGame score={score} userName={userName}/>
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
                        scoringOn={scoringOn}
                    />            
            </div>
        </div>
    </ >
    )
}


GameOver.getInitialProps = async (ctx) =>{

    let resp = await authPage('http://localhost:3000/api/checkauth',ctx);
    return {props : []};
  }