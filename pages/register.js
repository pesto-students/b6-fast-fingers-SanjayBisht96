import styles from '../styles/Home.module.css'
import React, { useEffect,useState } from 'react';
import useUserName from '../hooks/useUserName';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'));
const TextBox = dynamic(() => import('../components/TextBox'));
const Logo = dynamic(() => import('../components/Logo'));
const Button = dynamic(() => import('../components/Button'));

export default function Register() {
  const [ userName, setUserName ] = useState('');
  const [ emailID, setEmailId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emptyError, setEmptyError ] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault()

    const res = await fetch(
      '/api/register/submit',
      {
        body: JSON.stringify({
          userName: userName,
          emailId: emailID,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
}

  useEffect(()=>{
    if(useUserName == '' || emailID == '' || password == ''){
        setEmptyError( emptyError => true);
    }else{
        setEmptyError( emptyError => false);
    }

  },[useUserName,emailID,password]);

  return (
    <div className={styles.container}>
        <Header/>
        <Logo 
          logoClass={"logohomeContainer"}
          imgSrc={"/assets/keyboard.png"}
          alt={"Fast Finger Logo"}
          imgClass={"keyImg"}
          textClass={"homeLogo"}
          text={"Fast Fingers"}
          description={"the ultimate typing game"}
        />
        <TextBox 
                id={"inputName"}
                textBoxClass={"inputNameClass"}
                text={userName}
                setText={setUserName}
                placeholder={"Type your name"}
        />
        <TextBox 
                id={"inputName"}
                textBoxClass={"inputNameClass"}
                text={emailID}
                setText={setEmailId}
                placeholder={"Type your email address"}
        />
        <TextBox 
                id={"inputName"}
                textBoxClass={"inputNameClass"}
                text={password}
                setText={setPassword}
                placeholder={"Type your password"}
        />                
        { emptyError ? <div className={styles.error}>Please enter all boxes.</div>:null }
        <Button
          styleClass
          clickFunction={registerUser}
          imgSrc={'/assets/start.png'}
          altText={"Register"}
          imgClass={"startImg"}
          textClass={"startText"}
          ButtonText={"Register"}
        />
    </div>
  )
}
