let userModel=require("../models/user.js");
let jwt=require('jsonwebtoken');

async function saveBmi(req,res){
    let user = await userModel.findOne({email:req.body.email})
    let bmiArr = [...user.bmi,{date:req.body.date,bmi:req.body.bmi}]
    await userModel.findByIdAndUpdate(user["_id"],{bmi:bmiArr})
    res.status(200).json({done:"done"})
}

module.exports.saveBmi = saveBmi;