import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { selectQuery } from '../../utils/databaseUtil';
const jwt = require('jsonwebtoken');

export default async function login(req, res){
    if(req.method === 'POST'){
        const { emailId, password } = req.body;
        let sql = `SELECT * FROM user WHERE email = "${emailId}"`;
        const row = await selectQuery(sql);
        if(row.length !== 0){
            const result = Object.values( JSON.parse(JSON.stringify(row[0])));
            const [ savedUser, savedEmail ,savedPassword ] = result;
            const match = await compare(password,savedPassword);
                
            if(match){
                    const claims = { user : savedUser };
                    const token = jwt.sign(claims, process.env.SECRET,{ expiresIn: '1h' });
                    res.setHeader('Set-Cookie', serialize('token', token, { 
                        httpOnly:true,
                        sameSite: true,
                        maxAge: 3600,
                        path: '/' 
                    }));
                    return res.status(200).json({authToken:token, userName: savedUser});
            }
        }
    }        
        return res.status(405).send({message:"Something went wrong "});
  }