let userModel=require("../models/user.js");
let config = require("../config.json")
let jwt = require("jsonwebtoken")
function getLoginPage(req,res)
{
 res.render("login.ejs");
}


function getSignUpPage(req,res)
{
    res.render("signup.ejs");
}


async function getProfilePage(req,res){
    let {email} = jwt.verify(req.cookies.jwt,config.secretKey);

    console.log(req.body);
    let user = await userModel.findOne({email})
    res.render("profile.ejs",{user});
}


function getEmotionalWall(req,res)
{
   res.render("cheerMeUp.ejs");
}

function getHomePage(req,res)
{
    res.render("index.ejs");
}

function getPageNotFound(req,res)
{
    res.render("notfound.ejs");
}

function addPost(req,res)
{
    if(!req.body.logged) res.redirect("/login")
    res.render("addPost.ejs");
}


module.exports.getProfilePage = getProfilePage
module.exports.getLoginPage = getLoginPage
module.exports.getHomePage = getHomePage
module.exports.getSignUpPage = getSignUpPage
module.exports.getPageNotFound=getPageNotFound
module.exports.getEmotionalWall=getEmotionalWall
module.exports.addPost=addPost
