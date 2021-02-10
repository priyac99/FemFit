let userModel=require("../models/user.js");
let postModel=require("../models/post.js");
let config = require("../config.json")
let jwt = require("jsonwebtoken")
function getLoginPage(req,res)
{
    if(req.body.logged) res.redirect("/profile")
 res.render("login.ejs",{logged:req.body.logged});
}


function getSignUpPage(req,res)
{
    if(req.body.logged) res.redirect("/profile")
    res.render("signup.ejs",{logged:req.body.logged});
}


async function getProfilePage(req,res){
    let {email} = jwt.verify(req.cookies.jwt,config.secretKey);

    console.log(req.body);
    let user = await userModel.findOne({email})
    res.render("profile.ejs",{user,logged:req.body.logged});
}


async function getEmotionalWall(req,res)
{
   let posts =  await postModel.find({ reviewed: true })

   if(posts.length<10)
   {
    res.render("cheerMeUp.ejs",{posts,logged:req.body.logged});
   }
   else
   {
       let cnt=0;
       let mySet=new Set();
       let selectedPosts=[]

       while(cnt<10)
       {
           let idx=Math.floor(Math.random()*posts.length);

           if(!mySet.has(idx))
           {
               cnt++;
               selectedPosts.push(posts[idx]);
               mySet.add(idx)

           }

       }
       
       res.render("cheerMeUp.ejs",{posts:selectedPosts,logged:req.body.logged});

   }

   
}

function getHomePage(req,res)
{
    res.render("index.ejs",{logged:req.body.logged});
}

function getPageNotFound(req,res)
{
    res.render("notfound.ejs",{logged:req.body.logged});
}

function addPost(req,res)
{
    if(!req.body.logged) res.redirect("/login")
    res.render("addPost.ejs",{logged:req.body.logged});
}

async function getReviewPage(req,res)
{let {role} = jwt.verify(req.cookies.jwt,config.secretKey);
    if(!req.body.logged) res.redirect("/login")
    if(role!=="admin") res.redirect("/")

   let posts =  await postModel.find({ reviewed: false })
console.log(posts);
    res.render("review.ejs",{posts,logged:req.body.logged});
}


module.exports.getProfilePage = getProfilePage
module.exports.getLoginPage = getLoginPage
module.exports.getHomePage = getHomePage
module.exports.getSignUpPage = getSignUpPage
module.exports.getPageNotFound=getPageNotFound
module.exports.getEmotionalWall=getEmotionalWall
module.exports.addPost=addPost
module.exports.getReviewPage=getReviewPage

