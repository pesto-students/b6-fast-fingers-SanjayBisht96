import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';

export default function User() {
    const [user, setUser] = useState('');

    useEffect(() => {
        setUser(localStorage.getItem("userName"));
    },[])

    return  (<div className={styles.user}>
                    <img
                        src="/assets/userLogo.png"
                        alt="user Logo"
                        className={styles.userLogo}
                    />
                <div className={styles.text}>{ user }</div>
            </div>
    )
  }