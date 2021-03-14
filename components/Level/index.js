import styles from '../../styles/Game.module.css';
import useDifficulty from '../../hooks/useDifficulty';

export default function Level() {
    const { diffLevel } = useDifficulty();
 
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