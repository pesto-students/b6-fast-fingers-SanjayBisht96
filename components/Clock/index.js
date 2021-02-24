import styles from '../../styles/Game.module.css';
import Image from 'next/image';
import getFormattedTime from '../../utils/getFormattedTime';
import { useState, useEffect,useRef    } from 'react';

export default function Clock(props) {

//     useEffect(()=>{
// // Start with an initial value of 20 seconds
// const TIME_LIMIT = 20;

// // Initially, no time has passed, but this will count up
// // and subtract from the TIME_LIMIT
// let timePassed = 0;
// let timeLeft = TIME_LIMIT;
//     },[time])


    return  (<div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
        <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining remainingPathColor"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>        
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">
      { getFormattedTime(props.time) }
    </span>
  </div>
    )
  }