let express=require('express');
let router=express.Router();
let postController=require("../controllers/post.js");


router.route("/addPost").post(postController.addPost)
router.route("/reviewAdd").post(postController.reviewAdd)
router.route("/reviewDelete").post(postController.reviewDelete)

module.exports=router