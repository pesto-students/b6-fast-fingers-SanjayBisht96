import styles from '../styles/Game.module.css';
import Image from 'next/image';
import UserContext from '../components/UserContext';
import { useContext } from 'react';

export default function User() {
    const { user } = useContext(UserContext);

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