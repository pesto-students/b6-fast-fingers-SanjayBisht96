import { useState, useEffect } from "react";
import { EASY,MEDIUM,HARD,DIFF_OPTIONS,DiffFactorToDiffLevel } from '../utils/consts';

function useDifficulty(level) {
  const [diffFactor, setDiffFactor] = useState(DIFF_OPTIONS[level]);
  const [diffLevel, setDiffLevel] = useState(level);

    useEffect(()=>{
        if(diffFactor < DIFF_OPTIONS[MEDIUM]){
            setDiffLevel(EASY);
        }else if (diffFactor >= DIFF_OPTIONS[MEDIUM] && diffFactor < DIFF_OPTIONS[HARD]){
            setDiffLevel(MEDIUM);
        } else {
            setDiffLevel(HARD);
        }
    },[diffFactor]);

    return {
        diffFactor, 
        setDiffFactor, 
        diffLevel,
        setDiffLevel
    }
}
export default useDifficulty;