import { insertQuery } from '../../../utils/databaseUtil';
import { hash } from 'bcrypt';


export default function submit(req, res){
    const { userName, emailId, password } = req.body;
    hash(password,10,async function(err,hash){
      let sql = `INSERT INTO user (name,email,password) value ("${userName}","${emailId}","${hash}")`;
      insertQuery(sql);
    });
    res.status(200).json({ans:"success"});
  };