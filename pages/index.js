import styles from '../styles/Home.module.css'
import Image from 'next/image'
import UserContext from '../components/UserContext';
import { useState , useContext } from 'react';
import Router from 'next/router';
import { DiffFactorToDiffLevel } from '../components/consts';
import Head from 'next/head'

export default function Home() {
  const [userName, setUserName] = useState('');
  const { diffFactor, diffLevel, updateDiffLevel, updateDiffFactor } = useContext(UserContext)
  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const updateDiffParams = (e) => {
    let factor = parseFloat(e.target.value);
    updateDiffFactor(factor);
    updateDiffLevel(DiffFactorToDiffLevel[factor]);
  }

  const startGame = (e) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('diffLevel', diffLevel);
    localStorage.setItem('diffFactor', diffFactor);
    Router.push('/in-game');
  }

  return (
    <div>
      <Head>
      <link rel="icon" href="/assets/keyboard.png" />
      <title>Fast Fingers</title>
    </Head>
    <div className={styles.container}>
      <img
        src="/assets/keyboard.png"
        alt="Fast Finger Logo"  
        className={styles.keyImg}
      />
      <div className={styles.title}>Fast Fingers</div>
      <input
        id="userNameInput"
        className={styles.inputName}
        type="text"
        placeholder="Enter Your Name..."
        onChange={handleUserName}
        />
      <select onChange={updateDiffParams} className={styles.selectLevel}>
        <option value="1">Easy</option>
        <option value="1.5">Medium</option>
        <option value="2">Hard</option>
      </select>
      <div className={styles.start+ ` button`} onClick={startGame}>
      <img
        src="/assets/start.png"
        alt="Start Game"  
        width="64px" height="64px" 
        className={styles.startImg}
      />
      <div className={styles.startText}>Start Game</div>
      </div>
    </div>
    </div>
  )
}
