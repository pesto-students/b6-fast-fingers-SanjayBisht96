const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    if(req.cookies.token){
        let match = jwt.verify(req.cookies.token, process.env.SECRET);
        if(match){
            return res.status(200).json({user: match.user});
        }
    }
    return res.status(401).json({message:"You are not authenticated user"});
  }

export default getUser;