let userModel=require("../models/user.js");
let postModel=require("../models/post.js");
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


async function getEmotionalWall(req,res)
{
   let posts =  await postModel.find({ reviewed: true })
   res.render("cheerMeUp.ejs",{posts});
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

async function getReviewPage(req,res)
{let {role} = jwt.verify(req.cookies.jwt,config.secretKey);
    if(!req.body.logged) res.redirect("/login")
    if(role!=="admin") res.redirect("/")

   let posts =  await postModel.find({ reviewed: false })
console.log(posts);
    res.render("review.ejs",{posts});
}


module.exports.getProfilePage = getProfilePage
module.exports.getLoginPage = getLoginPage
module.exports.getHomePage = getHomePage
module.exports.getSignUpPage = getSignUpPage
module.exports.getPageNotFound=getPageNotFound
module.exports.getEmotionalWall=getEmotionalWall
module.exports.addPost=addPost
module.exports.getReviewPage=getReviewPage

