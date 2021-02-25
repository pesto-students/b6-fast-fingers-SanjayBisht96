import styles from '../styles/Home.module.css'
import React from 'react';
import Router from 'next/router';
import { clearStorage,addToStorage } from '../utils/localStorage';
import { EASY,DIFF_OPTIONS,inGameUrl } from '../utils/consts';
import useUserName from '../hooks/useUserName';
import useDifficulty from '../hooks/useDifficulty';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'));
const TextBox = dynamic(() => import('../components/TextBox'));
const DropDown = dynamic(() => import('../components/DropDown'));
const Logo = dynamic(() => import('../components/Logo'));
const Button = dynamic(() => import('../components/Button'));

export default function Home() {
  const {userName, setUserName, emptyNameError, setEmptyNameError } = useUserName('');
  const { diffFactor,setDiffFactor,diffLevel } = useDifficulty(EASY);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const startGame = () => {
    clearStorage();
    if(!userName){
      setEmptyNameError(true);
      console.log(emptyNameError);
      return; 
    }else{
      setEmptyNameError(false);
    }
    addToStorage('userName', userName);
    addToStorage('diffFactor', diffFactor);
    addToStorage('diffLevel', diffLevel);
    Router.push(inGameUrl);
  }

  return (
    <div className={styles.container}>
        <Header/>
      {/* <div className={styles.container}>
        <img
          src="/assets/keyboard.png"
          alt="Fast Finger Logo"  
          className={styles.keyImg}
        />
        <div className={styles.title}>Fast Fingers</div> */}
        <Logo 
          logoClass={"logohomeContainer"}
          imgSrc={"/assets/keyboard.png"}
          alt={"Fast Finger Logo"}
          imgClass={"keyImg"}
          textClass={"homeLogo"}
          text={"Fast Fingers"}
        />
        <TextBox 
                id={"inputName"}
                textBoxClass={"inputNameClass"}
                text={userName}
                changeFunction={handleUserName}
                placeholder={"Type your name"}
        />
        { emptyNameError ? <div className={styles.error}>Please enter a name.</div>:null }
        <DropDown
          diffOptions={DIFF_OPTIONS}
          setDiffFactor={setDiffFactor}
        />
        <Button
          styleClass
          clickFunction={startGame}
          imgSrc={'/assets/start.png'}
          altText={"Start Game"}
          imgClass={"startImg"}
          textClass={"startText"}
          ButtonText={"Start Game"}
        />
    </div>
  )
}
