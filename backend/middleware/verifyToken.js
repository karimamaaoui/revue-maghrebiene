const jwt= require("jsonwebtoken");
const User =require ('../model/user');


const verifyUserToken=( req,res,next)=>{
    let  token=req.headers['authorization'];
  //  console.log(token);
    token=token.slice(7,token.length);
    if(token)
    {
        jwt.verify(token,process.env.SECRET_Key,(err,decoded)=>{
            if(err)
            {
                return res.json({
                    status:false,
                    msg:"token is invalid"
                })
            }
            else{
                req.decoded=decoded;
             //   console.log("req decoided id",req.decoded.id)
                next();

            }
        })
    }
    else{
        return  res.json({
            status:false,
            msg:"token is provided"
        })
    };
}
module.exports={
    verifyUserToken: verifyUserToken,
  
}

