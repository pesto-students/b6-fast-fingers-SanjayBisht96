import styles from '../styles/Game.module.css';
import Image from 'next/image';

export default function Logo() {
    return  (<div className={styles.logo}>
                <img
                    src="/assets/keyboard.png"
                    alt="Fast Finger Logo"
                    className={styles.img}
                />
                <div className={styles.text+' '+styles.logoText}>Fast Fingers</div>
            </div>
    )
  }