const jwt = require('jsonwebtoken');

const checkAuth = async (req, res) => {
    if(req.cookies.token){
        let match = jwt.verify(req.cookies.token, process.env.SECRET);
        if(match){
            return res.status(200).json({message: "You are authenticated user"});
        }
    }
    return res.status(401).json({message:"You are not authenticated user"});
  }

export default checkAuth;