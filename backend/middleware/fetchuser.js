var jwt = require('jsonwebtoken');
const JWT_SECRET='Riyaisagoodg$rl'; 
const authenticationError={error:"Please authenticate using a valid token"};
const fetchuser=(req, res, next)=>{
// Get the user from the jwt token and add id to req object
const token=req.header('auth-token');
if(!token){
return res.status(401).send(authenticationError);  // 401- access declined error
}
try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
}
catch(error){
    res.status(401).send(authenticationError);
}
   // after fetch user next is async (req, res) => {....}
}

module.exports=fetchuser;