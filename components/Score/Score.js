import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import { useEffect, useContext,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import getFormattedTime from '../../utils/getFormattedTime';

export default function Score() {
  const score = useSelector(state => {return state.score.score});
  console.log("score");
    return  (<div className={styles.score}>
                <div className={styles.text + ' ' + styles.userScore}>Score: </div>
                <div className={styles.text}>{ getFormattedTime(score) }</div>
            </div>
    )
  }