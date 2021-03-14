import { insertQuery } from '../../utils/databaseUtil';

export default function addScoreList(req, res){
    const { userName, score } = req.body;
    if(score && userName){
        let sql = `INSERT INTO score (name,score) value ("${userName}","${score}")`;
        insertQuery(sql);
       return res.status(200).json({message:"score added"});
    }
    return res.status(500).json({message:"failed to add score"});
  };