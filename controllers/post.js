let postModel=require("../models/post.js");
// let config=require("../config/config.json");
let jwt=require('jsonwebtoken');


function addPost(req,res)
{

    // let {email} = jwt.verify(req.cookies.jwt,config.secretKey);
    let {email} = jwt.verify(req.cookies.jwt,process.env.secretKey);
    
    req.body.email=email;
    req.body.reviewed=false;

    new postModel(req.body).save();

    res.redirect("/cheerMeUp");

}

async function reviewAdd(req,res){
    let id = req.body.id
    await postModel.findByIdAndUpdate(id,{reviewed:true})
    res.redirect("/review")
}
async function reviewDelete(req,res){
    let id = req.body.id
    await postModel.findByIdAndDelete(id)
    res.redirect("/review")
}

module.exports.addPost=addPost
module.exports.reviewAdd = reviewAdd
module.exports.reviewDelete = reviewDelete