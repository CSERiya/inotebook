var jwt = require('jsonwebtoken');
const JWT_SECRET='Riyaisagoodg$rl'; 
const fetchuser=(req, res, next)=>{
// Get the user from the jwt token and add id to req object
const token=req.header('auth-token');
if(!token){
return res.status(401).send({error:"Please authenticate using a valid token"});  // 401- access declined error
}
try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
}
catch(error){
    res.status(401).send({error:"Please authenticate using a valid token"});
}
   // after fetch user next is async (req, res) => {....}
}

module.exports=fetchuser;