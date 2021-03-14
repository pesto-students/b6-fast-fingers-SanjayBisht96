import { useState } from "react";
import { EASY,MEDIUM,HARD,DIFF_OPTIONS } from '../utils/consts';
import { getFromStorage,addToStorage} from '../utils/localStorage';

function useDifficulty() {
  const [diffFactor, setDiffFactor] = useState(()=> {
    return parseFloat(getFromStorage("diffFactor")) ? parseFloat(getFromStorage("diffFactor")) : 1;
});
  const [diffLevel, setDiffLevel] = useState(() => {
    return getFromStorage("diffLevel") ? getFromStorage("diffLevel") : EASY;
  });


    const setDiffValues = (factor) =>{
        factor = parseFloat(factor);
        setDiffFactor(factor);
        if(factor < DIFF_OPTIONS[MEDIUM]){
            setDiffLevel(diffLevel => EASY);
            addToStorage("diffLevel",EASY);
        }else if (factor >= DIFF_OPTIONS[MEDIUM] && factor < DIFF_OPTIONS[HARD]){
            setDiffLevel(diffLevel => MEDIUM);
            addToStorage("diffLevel",MEDIUM);
        } else {
            setDiffLevel(diffLevel => HARD);
            addToStorage("diffLevel",HARD);
        }
        addToStorage("diffFactor",factor);
        }

    return {
        diffFactor,  
        diffLevel,
        setDiffValues
    }
}
export default useDifficulty;