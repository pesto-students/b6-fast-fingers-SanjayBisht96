import { insertQuery,selectQuery } from '../../../utils/databaseUtil';
import { hash } from 'bcrypt';


export default async function submit(req, res){
    const { userName, emailId, password } = req.body;
    if(userName){
      let sql = `SELECT * FROM user WHERE name="${userName}" `;
      let row = await selectQuery(sql);
      if(row.length >0){
        return res.status(405).json({message:"username already exist"});
      }
    }

    if(emailId){
      let sql = `SELECT * FROM user WHERE  email="${emailId}"`;
      let row = await selectQuery(sql);
      if(row.length >0){
        return res.status(405).json({message:"email already registered exist"});
      }
    }

    hash(password,10,async function(err,hash){
      let sql = `INSERT INTO user (name,email,password) value ("${userName}","${emailId}","${hash}")`;
      insertQuery(sql);
    });
    return res.status(200).json({ans:"success"});
  };