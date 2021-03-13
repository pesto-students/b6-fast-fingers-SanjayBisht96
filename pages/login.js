import styles from '../styles/Home.module.css'
import React, { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { addToStorage } from '../utils/localStorage';

const Header = dynamic(() => import('../components/Header'));
const TextBox = dynamic(() => import('../components/TextBox'));
const Logo = dynamic(() => import('../components/Logo'));
const Button = dynamic(() => import('../components/Button'));

export default function Login() {
  const [ emailID, setEmailId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emptyError, setEmptyError ] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(
      '/api/login',
      {
        body: JSON.stringify({
          emailId: emailID,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );

    if(res.status === 200){
      const {token, userName} = await res.json();
      addToStorage('userName', userName);
      Router.push("/");
    }
}

  useEffect(()=>{
    if(emailID == '' || password == ''){
        setEmptyError( emptyError => true);
    }else{
        setEmptyError( emptyError => false);
    }

  },[emailID,password]);

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
          clickFunction={loginUser}
          imgSrc={'/assets/start.png'}
          altText={"Login"}
          imgClass={"startImg"}
          textClass={"startText"}
          ButtonText={"Login"}
        />
    </div>
  )
}
