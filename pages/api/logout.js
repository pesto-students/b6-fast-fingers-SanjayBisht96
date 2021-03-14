import { serialize } from 'cookie';
const jwt = require('jsonwebtoken');


export default async function logout(req, res){
    if(req.method === 'POST'){
        if(req.cookies.token){
        res.setHeader('Set-Cookie', serialize('token', '', { 
            httpOnly:true,
            sameSite: true,
                maxAge: 0,
                path: '/' 
            }));
        return res.status(200).json({message:"Log out successful"});
        }
    }        
        return res.status(405).send({message:"Something went wrong "});
  }