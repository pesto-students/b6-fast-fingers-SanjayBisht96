import { useState, useEffect,useRef } from "react";
import { getFromStorage } from "../utils/localStorage";
import { counterMiliSecSpeed } from '../utils/consts';

function useScore(startScore,val=0) {
    const [score, setScore] = useState(val);
    const [scoreList, setScoreList] = useState([]);
    const [scoringOn, setScoringOn] = useState(startScore);
    const timer = useRef(null);

    useEffect(() => {
        if(getFromStorage("score")){
            setScore(score => JSON.parse(getFromStorage("score")));
        }
        if(getFromStorage("scoreList")){
            setScoreList(scoreList => JSON.parse(getFromStorage("scoreList")));
        }        
    },[]);


    useEffect(() => {
        if(scoringOn){
            setScore(score => 0);
            timer.current = setInterval(() => {
                setScore(score => score + counterMiliSecSpeed);
              }, counterMiliSecSpeed);
        }
    },[scoringOn]);

    useEffect(() => {        
        if(!scoringOn){
            clearInterval(timer.current);
        }
    },[score,scoringOn]);    
    
    
    return {
        score,
        setScore,
        scoreList, 
        setScoreList,
        scoringOn,
        setScoringOn
    }
}
export default useScore;