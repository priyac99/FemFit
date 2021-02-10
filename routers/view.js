let express=require('express');
let router=express.Router();
let viewController=require("../controllers/view.js");
let authController=require("../controllers/auth.js");

//Sign-up
router.route("/signup").get(viewController.getSignUpPage)


//Login
router.route("/login").get(viewController.getLoginPage)

router.route("/profile").get(viewController.getProfilePage)

router.route("/notfound").get(viewController.getPageNotFound)

router.route("/cheerMeUp").get(viewController.getEmotionalWall)

router.route("/addPost").get(authController.checkLogin,viewController.addPost)

router.route("/").get(viewController.getHomePage)



module.exports=router