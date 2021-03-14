import styles from '../styles/Home.module.css'
import React, { useEffect,useState } from 'react';
import Router from 'next/router';
import { loginUrl } from '../utils/consts';
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
  const [ registerFailError, setRegisterFailError ] = useState(false);

  const validateCred = () =>{
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailID == '' || password == '' || userName ==='' || !emailID.match(validRegex)){
      setEmptyError( emptyError => true);
      return false;
    }
    return true;
  }


  const registerUser = async (e) => {
    e.preventDefault()
    if(!validateCred()){
      setEmptyError( emptyError => true);
      setRegisterFailError(registerFailError => false);
      return;
    }
    setEmptyError( emptyError => false);

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

    if(res.status === 200){
      setRegisterFailError(registerFailError => false);
      Router.push(loginUrl);
    }else{
      setRegisterFailError(registerFailError => true);
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
                type={"text"}
                textBoxClass={"inputNameClass"}
                text={userName}
                setText={setUserName}
                placeholder={"Type your name"}
        />
        <TextBox 
                id={"inputName"}
                textBoxClass={"inputNameClass"}
                type={"email"}
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
        <Button
          styleClass
          clickFunction={registerUser}
          imgSrc={'/assets/userLogo.png'}
          altText={"Register"}
          imgClass={"userImg"}
          textClass={"startText"}
          ButtonText={"Register"}
        />
        { registerFailError ? <div className={styles.error}>Something went wrong with registration.</div>:null }
    </div>
  )
}
