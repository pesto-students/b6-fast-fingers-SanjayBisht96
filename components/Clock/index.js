import getFormattedTime from '../../utils/getFormattedTime';
import styles from './index.module.css';

export default function Clock({time}) {


    return  (<div className={styles.base_timer}>
    <svg className={styles.base_timer__svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g className={styles.base_timer__circle}>
        <circle className={styles.base_timer__path_elapsed} cx="50" cy="50" r="45" />
        <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        className={styles.base_timer__path_remaining + ' ' + styles.remainingPathColor}
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>        
      </g>
    </svg>
    <span id="base-timer-label" className={styles.base_timer__label}>
      { getFormattedTime(time) }
    </span>
  </div>
    )
  }