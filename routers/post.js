let express=require('express');
let router=express.Router();
let postController=require("../controllers/post.js");


router.route("/addPost").post(postController.addPost)

module.exports=router