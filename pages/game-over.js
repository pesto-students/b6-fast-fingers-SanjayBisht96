import styles from '../styles/Game.module.css'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { homeUrl } from '../components/consts';

const Header = dynamic(() => import('../components/Header'));
const Logo = dynamic(() => import('../components/Logo'));
const Level = dynamic(() => import('../components/Level'));
const ScoreBoard = dynamic(() => import('../components/ScoreBoard'));
const User = dynamic(() => import('../components/User'));
const Score = dynamic(() => import('../components/Score'));
const Button = dynamic(() => import('../components/Button')); 
const EndGame = dynamic(() => import('../components/EndGame'));

export default function GameOver() {
    const resetGame = () => {
        localStorage.clear();
        Router.push(homeUrl);
    }

    return (
    <React.Fragment>
        <Header/>
        <div className={styles.container}>
            <div className={styles.left}>
                <Logo/>
                <Level/>
                <ScoreBoard/>
            {/* <div className={styles.stop + ` button`} onClick={resetGame}>
            <img 
                src="/assets/stop.png"
                alt="Fast Finger Logo"
                className={styles.stopImg}                    
             />
                <div className={styles.stopText}>QUIT GAME</div>
             </div> */}
             <Button/>
            </div>
            <div className={styles.middle}>
                <EndGame/>
            </div>
            <div className={styles.right}>
                <User/>
                <Score/>
            </div>
        </div>
    </React.Fragment >
    )
}