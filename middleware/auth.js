const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
var privateKey = fs.readFileSync("./jwtRS256.key");

module.exports=(req,res,next)=>{
    try {
        const authHeader=req.headers['authorization'];
        if(typeof authHeader!=='undefined'){
            const token=authHeader.split(" ")[1];
            var decoded = jsonwebtoken.verify(token, privateKey,{ algorithms:'RS256' });
            req.user=decoded.data;
        }else if(req.query.token){
            const token=req.query.token;
            var decoded = jsonwebtoken.verify(token, privateKey,{ algorithms:'RS256' });
            req.user=decoded.data;
        }
        else{
            var data={
                "status":false,
                "code":401,
                "message":["Unuthorized"],
                "data":null
            }
            return res.status(401).json(data);
        }
      } catch(err) {
        var data={
            "status":false,
            "code":401,
            "message":["Unuthorized"],
            "data":null
        }
        return res.status(401).json(data);
      }
    next();
}