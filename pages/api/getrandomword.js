import { selectQuery } from '../../utils/databaseUtil';


export default async function getRandomWord(req, res){
        const { diffLevel } = req.body;
        if(diffLevel){
            let sql = `SELECT Word FROM words WHERE Difficulty = "${diffLevel}"  ORDER BY RAND() LIMIT 1`;
            let word = await selectQuery(sql);
            if(word){
                word = Object.values(word[0]);
                return res.status(200).json({word:word[0]});
            }
        }
    return res.status(500).json({message:"failed to get word"});
  }