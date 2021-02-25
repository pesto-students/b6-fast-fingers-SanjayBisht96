import styles from '../styles/Game.module.css'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'));
const Logo = dynamic(() => import('../components/Logo'));
const Level = dynamic(() => import('../components/Level'));
const ScoreBoard = dynamic(() => import('../components/ScoreBoard'));
const User = dynamic(() => import('../components/User'));
const Score = dynamic(() => import('../components/Score'));
const Game = dynamic(() => import('../components/Game'));
const Button = dynamic(() => import('../components/Button')); 

export default function InGame() {

    const {userName, setUserName } = useUserName('');
    const stopGame = () => {
         
    }

    return (
        <React.Fragment>
            <Header/>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Logo 
                        logoClass={"logoGameContainer"}
                        imgSrc={"/assets/keyboard.png"}
                        alt={"Fast Finger Logo"}
                        imgClass={"smallLogo"}
                        textClass={"gameLogo"}
                        text={"Fast Fingers"}
                    />
                    <Level/>
                    <ScoreBoard/>
                    {/* <div className={styles.stop + ` button`} onClick={stopGame}>
                <img 
                    src="/assets/stop.png"
                    alt="Fast Finger Logo"
                    className={styles.stopImg}                    
                />
                <div className={styles.stopText}>STOP GAME</div>
                </div> */}
                <Button/>
                </div>
                <div className={styles.middle}>
                        <Game stop={true}/>
                </div>
                <div className={styles.right}>
                <Logo 
                        logoClass={"userLogoContainer"}
                        imgSrc={"/assets/user.png"}
                        alt={"User Logo"}
                        imgClass={"smallLogo"}
                        textClass={"userLogo"}
                        text={userName}
                    />
                    <Score/>
                </div>
            </div>
    </React.Fragment>
    )
}