import { useEffect, useState } from "react";
import { wordLengthLimit } from '../utils/consts';
import data from '../public/data/dictionary.json';
import { getRandomWord } from '../utils/callApi';

const getWord = async (diffLevel) => {
    if(typeof diffLevel !== undefined && diffLevel !== ''){
      if(Array.isArray(wordLengthLimit[diffLevel])){
        const [minLength, maxLength] = wordLengthLimit[diffLevel];
        let randomWord = await getRandomWord();
        while(randomWord.length < minLength || randomWord.length > maxLength){
          randomWord = await getRandomWord();
        }
        return randomWord.toUpperCase();
      }
    }
    return '';
  }


function useWord(diffLevel, onMatch) {
    const [word, setWord] = useState('');
    const [input, setInput] = useState('');

  //   useEffect(() => {
  //       async function getWordSync(){
  //         const randomWord = await getWord(diffLevel);
  //         setWord(word => randomWord);
  //         console.log("x",randomWord);
  //       }
  //       getWordSync();
  // }, [])


    useEffect(() => {
        if (word === input) {
          async function getWordSync(){
            const randomWord = await getWord(diffLevel);
            setWord(randomWord);
            onMatch(randomWord);
            setInput('');
          }
          getWordSync();
        }
    }, [word,input, diffLevel])
    return { word, setWord, input, setInput  }
}
export default useWord;