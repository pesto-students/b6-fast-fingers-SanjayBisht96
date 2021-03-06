import { useEffect, useState } from "react";
import { wordLengthLimit } from '../utils/consts';
import data from '../public/data/dictionary.json';

const getWord = (diffLevel) => {
    if(typeof diffLevel !== undefined && diffLevel !== ''){
      if(Array.isArray(wordLengthLimit[diffLevel])){
        const [minLength, maxLength] = wordLengthLimit[diffLevel];
        let randomWord = data[Math.floor(Math.random() * data.length)];
        while(randomWord.length < minLength || randomWord.length > maxLength){
          randomWord = data[Math.floor(Math.random() * data.length)];
        }
        return randomWord.toUpperCase();
      }
    }
    return '';
  }


function useWord(diffLevel, onMatch) {
    const [word, setWord] = useState(getWord(diffLevel));
    const [input, setInput] = useState('');
    useEffect(() => {
        if (word !== '' && word === input) {
            const randomWord = getWord(diffLevel);
            setWord(randomWord);
            onMatch(randomWord);
            setInput('');
        }
    }, [word,  input, diffLevel])
    return { word, setWord, input, setInput  }
}
export default useWord;