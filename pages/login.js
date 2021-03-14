import styles from '../styles/Home.module.css'
import React, { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { homeUrl, registerUrl } from '../utils/consts';
import { addToStorage } from '../utils/localStorage';

const Header = dynamic(() => import('../components/Header'));
const TextBox = dynamic(() => import('../components/TextBox'));
const Logo = dynamic(() => import('../components/Logo'));
const Button = dynamic(() => import('../components/Button'));

export default function Login() {
  const [ emailID, setEmailId ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emptyError, setEmptyError ] = useState(false);
  const [ loginFailError, setLoginFailError ] = useState(false);

  const register = () => {
    Router.push(registerUrl);
  }

  const validateCred = () =>{
    if(emailID == '' || password == ''){
      setEmptyError( emptyError => true);
      return false;
    }
    return true;
  }

  const loginUser = async (e) => {
    e.preventDefault();
    if(!validateCred()){
      setEmptyError( emptyError => true);
      setLoginFailError(loginFailError => false);
      return;
    }
    setEmptyError( emptyError => false);
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
      setLoginFailError(loginFailError => false);
      Router.push(homeUrl);
    }else{
      setLoginFailError(loginFailError => true);
    }
}


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
            type={"email"}
            textBoxClass={"inputNameClass"}
            text={emailID}
            setText={setEmailId}
            placeholder={"Type your email address"}
        />
        <TextBox 
            id={"inputName"}
            type={"password"}
            textBoxClass={"inputNameClass"}
            text={password}
            setText={setPassword}
            placeholder={"Type your password"}
        />                
        { emptyError ? <div className={styles.error}>Please enter valid values in all boxes.</div>:null }
        <div>
            <Button
              styleClass={"loginButton"}
              clickFunction={loginUser}
              imgSrc={'/assets/start.png'}
              altText={"Login"}
              imgClass={"startImg"}
              textClass={"startText"}
              ButtonText={"Login"}
            />
            <Button
              styleClass={"registerButton"}
              clickFunction={register}
              imgSrc={'/assets/userLogo.png'}
              altText={"Register"}
              imgClass={"userImg"}
              textClass={"startText"}
              ButtonText={"Register"}
            />
        </div>        
        { loginFailError ? <div className={styles.error}>Your email or password didn't match.</div>:null }
    </div>
  )
}
