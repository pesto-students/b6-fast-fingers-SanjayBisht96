import { selectQuery } from '../../utils/databaseUtil';


export default async function getScoreList(req, res){
    const { userName } = req.body;
    //console.log(req.body);
    if(userName){
        let sql = `SELECT score FROM score where name="${userName}"`;
        let scoreList = await selectQuery(sql);
        let retrievedList = [];
        scoreList.forEach(score => {
            retrievedList.push(Object.values(score)[0]);
        });
        //console.log(retrievedList);
        return res.status(200).json({scoreList:retrievedList});
    }
    return res.status(500).json({message:"failed to get score"});
  };