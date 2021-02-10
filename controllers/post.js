let postModel=require("../models/post.js");
let config=require("../config.json");
let jwt=require('jsonwebtoken');


function addPost(req,res)
{

    let {email} = jwt.verify(req.cookies.jwt,config.secretKey);
    
    req.body.email=email;
    req.body.reviewed=false;

    new postModel(req.body).save();

    res.redirect("/cheerMeUp");

}

module.exports.addPost=addPost