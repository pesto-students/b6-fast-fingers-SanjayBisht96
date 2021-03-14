import { insertQuery } from '../../utils/databaseUtil';
import data from '../../public/data/dictionary.json';
import { EASY,MEDIUM,HARD } from '../../utils/consts';
var fs = require('fs');

function checkDiffLevel(word){
  let diffLevel = '';
    if( word.length <=4 ){
      diffLevel = EASY;
  }else if (word.length > 4 && word.length <=8  ){
      diffLevel = MEDIUM;
  }else{
      diffLevel = HARD;
  }
  return diffLevel;
}

export default async function importWords(req, res){
    let rstream = fs.createReadStream('./public/data/words.json');
    let first = '';
    let last = '';
    let tempWord = '';
    rstream.on('data', (chunkdata) => {
        let chunk = chunkdata.toString().replace(/(\r\n|\n|\r|")/gm, "");
        let wordList = chunk.split(",");
        let size = wordList.length;
        if( last !== ''){
          first = wordList[0];
          wordList.shift();
          tempWord = last + first;
          let diffLevel = checkDiffLevel(tempWord);
          var sql = `INSERT INTO words (Word, Difficulty) VALUES ('${tempWord}', '${diffLevel}')`;
          insertQuery(sql);
        }

        wordList.forEach(element => {
          let diffLevel = checkDiffLevel(element);
          if(element && diffLevel && element !== wordList[size-1]){
            var sql = `INSERT INTO words (Word, Difficulty) VALUES ('${element}', '${diffLevel}')`;
            insertQuery(sql);
          }
          if(element === wordList[size-1]){
            last = wordList[size-1];
          }
      });

    });
    rstream.on('end', function(){
        return res.status(200).json({message:"words added"});
      });

    rstream.on('error', function(){
        return res.status(500).json({message:"Something went wrong"});
    })      
  };