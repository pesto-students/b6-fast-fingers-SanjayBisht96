import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Level() {
    const { diffLevel } = useContext(UserContext);

    useEffect(() => {
        
      },[diffLevel])
    

    return  (<div className={styles.level}>
                <img
                    src="/assets/gameController.png"
                    alt="Fast Finger Logo"
                    className={styles.img}
                />
                <div className={styles.text + ' ' + styles.levelText  }>Level: { diffLevel }</div>
            </div>
    )
  }