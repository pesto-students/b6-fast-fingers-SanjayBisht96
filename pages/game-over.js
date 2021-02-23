import styles from '../styles/Game.module.css'
import { useState , useContext, createContext } from 'react';
import UserContext from '../components/UserContext';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { homeUrl } from '../components/consts';

const Logo = dynamic(() => import('../components/Logo/Logo'));
const Level = dynamic(() => import('../components/Level/Level'));
const ScoreBoard = dynamic(() => import('../components/ScoreBoard/ScoreBoard'));
const User = dynamic(() => import('../components/User/User'));
const Score = dynamic(() => import('../components/Score/Score'));
const EndGame = dynamic(() => import('../components/EndGame/EndGame'));

export default function GameOver() {
    const resetGame = () => {
        localStorage.clear();
        Router.push(homeUrl);
    }

    return (
    <div>
        <Head>
            <link rel="icon" href="/assets/keyboard.png" />
            <title>Fast Fingers</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.left}>
                <Logo/>
                <Level/>
                <ScoreBoard/>
            <div className={styles.stop + ` button`} onClick={resetGame}>
            <img 
                src="/assets/stop.png"
                alt="Fast Finger Logo"
                className={styles.stopImg}                    
             />
                <div className={styles.stopText}>QUIT GAME</div>
             </div>
            </div>
            <div className={styles.middle}>
                <EndGame/>
            </div>
            <div className={styles.right}>
                <User/>
                <Score/>
            </div>
        </div>
    </div>
    )
}