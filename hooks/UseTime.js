import { useState, useEffect, useRef } from "react";
import { counterMiliSecSpeed } from '../utils/consts';
import { setCircleDasharray } from '../utils/timeUtil';

function useTime(val) {
    const [time, setTime] = useState(val);
    const [timerOn, setTimerOn] = useState(false);
    const timer = useRef(null);
    let TIME_LIMIT = useRef(time);

    useEffect(() => {
        TIME_LIMIT.current = time;
        if(timerOn && time>0){
            timer.current = setInterval(() => {
                setTime(time => time - counterMiliSecSpeed);
            }, counterMiliSecSpeed);
        }
    },[timerOn]);

    useEffect(() => {
        if(time >= 0 && timerOn){
            setCircleDasharray(time,TIME_LIMIT.current);
          }        
        if(!timerOn){
            clearInterval(timer.current);
        }
    },[time,timerOn]);    

    return {
        time, 
        setTime,
        timerOn,
        setTimerOn
    }
}
export default useTime;