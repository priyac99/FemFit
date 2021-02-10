let userModel=require("../models/user.js");
let config=require("../config.json");
let jwt=require('jsonwebtoken');
var CryptoJS = require("crypto-js");
 



function checkLogin(req,res,next)
{   
    if(req.cookies.jwt){
    let {exp} = jwt.verify(req.cookies.jwt,config.secretKey);

    if(exp > Date.now()){
        //token is valid, do your stuff
      req.body.logged = false
      }
      else
      {
      req.body.logged = true
         
      }
    }
    else
    {
        req.body.logged = false

    }

     next()
}

function signup(req,res)
{

    if(req.body.logged) res.redirect("/profile")

        req.body.role ="user";
        let userPassword=req.body.password

       var hashedPassword = CryptoJS.AES.encrypt(userPassword, config.secretKey).toString();
       
        req.body.password=hashedPassword;

        try
        {
            new userModel(req.body).save() //adding data from req's body to DB
    
            
    
        }
        catch(err)
        {
            res.redirect("/notfound");
            
        }
        res.redirect("/login");
      


}

async function login(req,res)
{
    
    if(req.body.logged) res.redirect("/profile")

    let email=req.body.email;
    console.log(req.body);
    let user = await userModel.findOne({email}); //findOne is async by default 
    
    if(user) //If user was found in the database
    {

        let userPassword=req.body.password

        //decrypt
        var bytes  = CryptoJS.AES.decrypt(user.password, config.secretKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
    
        if(originalText==userPassword) //if passwords match 
        {
            let token=jwt.sign({email,role:user.role},config.secretKey,{expiresIn:"24h"});
            res.cookie("jwt",token);
            res.redirect("/profile")
        }
        else
        {
            res.status(404).json({err:"Invalid password"}); //return error
        }
       
        

        
    }else{ //If user wasn't found 
        res.status(404).json({err:"user not found"});
    }

   



    console.log(user);

}

module.exports.signup=signup;
module.exports.login=login;
module.exports.checkLogin=checkLogin;